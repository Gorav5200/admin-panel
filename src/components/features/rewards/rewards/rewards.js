import React, { useEffect, useMemo, useState } from "react";
import { HeaderWithNavigation } from "../../../common/header";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import BootstrapTextField from "../../../common/bootstrapTextField";
import {
  createHandleChange,
  dateFormatting,
} from "../../../../services/common";
import SingleImageUpload from "../../../common/singleImageUpload";
import DatePickerComp from "../../../common/datePicker";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { Badge, message } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useGetProductsQuery } from "../../../../services/apis/commonApi";
import { productApi, rewardsApi } from "../../../../services/Constant";
import { Dot } from "lucide-react";
import {
  useCreateRewardMutation,
  useUpdateRewardMutation,
} from "../../../../services/apis/rewardsApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BackdropLoader } from "../../../common/lineLoader";

function Rewards() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { rewardsDetails } = useSelector((state) => state.rewards);
  const [values, setValues] = useState(rewardsDetails);
  const [products, setProducts] = useState([]);
  const { data, isLoading, isFetching, isError } = useGetProductsQuery(
    `${productApi.endPoint}`
  );
  const [createReward, { isLoading: postLoad, isError: postError }] =
    useCreateRewardMutation();
  const [updateReward, { isLoading: updateLoad, isError: updateError }] =
    useUpdateRewardMutation();

  const edit = true;
  const handleChange = createHandleChange(values, setValues);
  console.log("🚀 ~ Referal ~ data:", data?.products);
  useEffect(() => {
    setProducts(data?.products);
  }, [data]);

  useEffect(() => {
    setValues(rewardsDetails);
  }, [rewardsDetails]);

  console.log("🚀 ~ Referal ~ values:", values, rewardsDetails);

  const handleCreate = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await createReward({
        endpoint: `${rewardsApi.rewardsEndPoint}`,
        data: values,
      });

      console.log("Response:", response);

      if (response && response?.data?.success) {
        message.success("Rewards Added successfully!", 2.5);
        navigate(`/main/rewards`);
      } else {
        message.error("Some error occured to Create Referral!", 2.5);
      }
    } catch (error) {
      console.error("Error add Add referral:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateReward({
        endpoint: `${rewardsApi.rewardsEndPoint}/${params.rewardId}`,
        updatedData: values,
      });

      console.log("Response:", response);

      if (response && response?.data?.success) {
        message.success("Rewards Update successfully!", 2.5);
        navigate(`/main/rewards/detail/${params.rewardId}`);
      } else {
        message.error("Some error occured to Update Rewards!", 2.5);
      }
    } catch (error) {
      console.error("Error add Upadte Rewards:", error);
    }
  };

  const handleSave = () => {
    if (location.pathname.includes("edit") && params.rewardId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const getProductsName = useMemo(() => {
    if (!values.products || !products) {
      return [];
    }
    const findInd = products?.findIndex((e) => e.type === values.type);
    if (findInd !== -1 && products[findInd]?.list) {
      const matchingProduct = products[findInd].list.filter((e) =>
        values.products.some((item) => item === e._id)
      );
      return matchingProduct;
    } else {
      return [];
    }
  }, [values?.products, products]);

  return (
    <div className="bg-lightGrey">
      <BackdropLoader isOpen={postLoad || updateLoad} />
      <HeaderWithNavigation
        cont={params.rewardId ? "Edit Rewards" : "Add Unlockable Rewards"}
      />
      <div className="flex gap-3 m-2 ">
        <Paper
          sx={{ boxShadow: "none" }}
          className="basis-9/12  h-[90vh] overflow-scroll scroll-smooth p-2 shadow-none scrollbar-hide rounded-md"
        >
          <Box
            component="form"
            display={"flex"}
            justifyContent={"space-between"}
            gap={3}
            width={"100%"}
            height={"82vh"}
            noValidate
            autoComplete="off"
            padding={2}
          >
            <div className="basis-[80%] gap-6 flex flex-col">
              <BootstrapTextField
                name="title"
                label="Reward Title"
                value={values.title}
                onChange={handleChange}
                readOnly={!edit && true}
                size="small"
                style={{ display: "flex" }}
              />
              <div className="flex gap-4">
                <FormControl sx={{ width: "100%" }} variant="standard">
                  <Box
                    component={"label"}
                    htmlFor="productType"
                    sx={{
                      fontSize: 16,
                      fontFamily: "var(--font-inter)",
                      fontWeight: 500,
                      color: "#455564",
                      mb: 1,
                    }}
                  >
                    Products Type
                  </Box>
                  <Select
                    labelId="productType"
                    id="demo-simple-select"
                    value={values.type} // Make sure values.type corresponds to one of the MenuItem values
                    variant="outlined"
                    size="small"
                    name="type"
                    onChange={handleChange}
                  >
                    {isLoading || isFetching || products?.length === 0 ? (
                      <MenuItem value="" disabled>
                        <div style={{ textAlign: "center", width: "100%" }}>
                          {isLoading || isFetching ? (
                            <>
                              {[...Array(10)]?.map(() => (
                                <Skeleton />
                              ))}
                            </>
                          ) : (
                            <>
                              <SmileOutlined style={{ fontSize: 20 }} />
                              <p>No Products Type available</p>
                            </>
                          )}
                        </div>
                      </MenuItem>
                    ) : (
                      products?.map(({ type }) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>

                {/* products */}
                <Collapse
                  in={values.type ? true : false}
                  sx={{ width: "100%" }}
                >
                  <FormControl
                    variant="standard"
                    sx={{ width: "100%", maxWidth: "40ch" }}
                  >
                    <Box
                      component={"label"}
                      htmlFor="products"
                      sx={{
                        fontSize: 16,
                        fontFamily: "var(--font-inter)",
                        fontWeight: 500,
                        color: "#455564",
                        mb: 1,
                      }}
                    >
                      Products
                    </Box>
                    <Select
                      labelId="products"
                      id="demo-simple-select"
                      value={values.products}
                      variant="outlined"
                      multiple
                      //                     defaultValue={values.products || (
                      //   products.find((e) => e.type === values.type)?.list[0]?._id
                      // )}
                      size="small"
                      multiSelect
                      name="products"
                      onChange={handleChange}
                    >
                      {isLoading || isFetching || products?.length === 0 ? (
                        <MenuItem value="" disabled>
                          <div style={{ textAlign: "center", width: "100%" }}>
                            {isLoading || isFetching ? (
                              <>
                                {[...Array(10)].map((_, index) => (
                                  <Skeleton key={index} />
                                ))}
                              </>
                            ) : (
                              <>
                                <SmileOutlined style={{ fontSize: 20 }} />
                                <p>No Products Type available</p>
                              </>
                            )}
                          </div>
                        </MenuItem>
                      ) : products?.find(({ type }) => type === values.type)
                          ?.list?.length === 0 ? (
                        <MenuItem value="" disabled>
                          <div style={{ textAlign: "center", width: "100%" }}>
                            <SmileOutlined style={{ fontSize: 20 }} />
                            <p>No data available for this product</p>
                          </div>
                        </MenuItem>
                      ) : (
                        products
                          ?.find(({ type }) => type === values.type)
                          ?.list?.map(({ title, _id }) => (
                            <MenuItem key={_id} value={_id}>
                              {title}
                            </MenuItem>
                          ))
                      )}
                    </Select>
                  </FormControl>
                </Collapse>
              </div>

              <BootstrapTextField
                name="description"
                label="Reward Description"
                value={values.description}
                onChange={handleChange}
                readOnly={!edit && true}
                size="small"
                multiline
                minRows={4}
                maxRows={7}
              />
              <div className="border p-2 rounded-md">
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    <h5 className="font-medium font-inter my-2 ">
                      Is Published :
                    </h5>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={values?.isPublished?.toString()}
                    name="isPublished"
                    onChange={handleChange}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label={<h5 className="font-normal font-inter">Yes</h5>}
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label={<h5 className="font-normal font-inter">No</h5>}
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="flex justify-between border p-2  rounded-md">
                <div>
                  <div>
                    <InputLabel
                      htmlFor="coins" // Make sure the htmlFor prop matches the id of the input field
                      shrink
                      sx={{
                        fontSize: 20,
                        fontFamily: "var(--font-inter)",
                        fontWeight: 500,
                        color: "#455564",
                        mt: 2,
                      }}
                    >
                      Coins
                    </InputLabel>
                  </div>
                  <TextField
                    id="coins"
                    name="coins"
                    type="number"
                    value={values.coins}
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                    style={{ width: "20ch" }}
                  />
                </div>

                <Divider orientation="vertical" variant="middle" flexItem />

                <section className="">
                  <div>
                    <InputLabel
                      htmlFor="startDate" // Make sure the htmlFor prop matches the id of the input field
                      shrink
                      sx={{
                        fontSize: 20,
                        fontFamily: "var(--font-inter)",
                        fontWeight: 500,
                        color: "#455564",
                        mt: 2,
                      }}
                    >
                      Start Date
                    </InputLabel>
                  </div>
                  <div>
                    <DatePickerComp
                      data={values.startDate}
                      setData={(val) =>
                        handleChange({
                          target: {
                            name: "startDate",
                            value: val,
                          },
                        })
                      }
                    />
                  </div>
                </section>
                <Divider orientation="vertical" variant="middle" flexItem />
                <section className="">
                  <div>
                    <InputLabel
                      htmlFor="endDate" // Make sure the htmlFor prop matches the id of the input field
                      shrink
                      sx={{
                        fontSize: 20,
                        fontFamily: "var(--font-inter)",
                        fontWeight: 500,
                        color: "#455564",
                        mt: 2,
                      }}
                    >
                      End Date
                    </InputLabel>
                  </div>
                  <div>
                    <DatePickerComp
                      data={values.endDate}
                      setData={(val) =>
                        handleChange({
                          target: {
                            name: "endDate",
                            value: val,
                          },
                        })
                      }
                    />
                  </div>
                </section>
              </div>
            </div>
            {/* Right side div for profile pic */}
            <div className="basis-[20%]">
              <SingleImageUpload
                setData={(val) =>
                  handleChange({
                    target: {
                      name: "thumbnail",
                      value: val,
                    },
                  })
                }
                data={values.thumbnail}
                circle={true}
                endpoint={`${rewardsApi.rewardsEndPoint.replace(
                  /^\/+/,
                  ""
                )}/upload/image`}
              />
            </div>
          </Box>

          <CustomButton
            size="small"
            type="submit"
            sx={{
              ...CustomButtonStyle,
              width: "150px",
              height: "40px",
              borderRadius: 2,
              float: "right",
              my: 2,
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            onClick={handleSave}
          >
            {params.rewardId ? "Save Changes" : " Save & Create"}
          </CustomButton>
        </Paper>
        {/* Preview section */}
        <div className="basis-3/12 h-[90vh] overflow-scroll scroll-smooth  scrollbar-hide rounded-md bg-medGrey p-2">
          <header>
            <h2 className="text-base font-semibold font-inter">Preview</h2>
          </header>
          <Paper
            sx={{
              boxShadow: "none",
              p: 1,
              textAlign: "justify",
              height: "full",
              overflow: "scroll",
              mt: 1,
            }}
          >
            <Card
              sx={{
                boxShadow: "none",
                border: "1px solid var(--light-grey)",
                background: `#bdc3c7` /* fallback for old browsers */,
                background: `-webkit-linear-gradient(to right, #2c3e50, #bdc3c7)` /* Chrome 10-25, Safari 5.1-6 */,
                background: `linear-gradient(to right, #2c3e50, #bdc3c7)` /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                color: "white",
                borderRadius: 2,
              }}
            >
              <CardHeader
                sx={{ flexDirection: "row-reverse" }}
                avatar={
                  <Avatar
                    src={values?.thumbnail}
                    aria-label="thumbnail"
                    sx={{
                      ml: 3,
                      background: "var(--light-grey)",
                      color: "transparent",
                    }}
                  />
                }
                title={
                  <span className="text-xl font-semibold font-inder max-w-xs">
                    {values?.title}
                  </span>
                }
                subheader={
                  <Badge
                    status={
                      values.isPublished.toString() === "true"
                        ? "success"
                        : "error"
                    }
                    text={
                      <span className="text-white transition-all duration-1000 ease-in-out">
                        {values?.isPublished.toString() === "true"
                          ? "Published"
                          : "Un-Published"}{" "}
                      </span>
                    }
                  />
                }
              />
              <Divider />

              <CardContent className="flex flex-col gap-4 ">
                <section>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold  text-gray-200 pl:1">
                      {values?.type}
                    </span>
                    <span className="text-gray-100 flex gap-1 text-sm">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-hand-coins"
                      >
                        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                        <path d="m2 16 6 6" />
                        <circle cx="16" cy="9" r="2.9" />
                        <circle cx="6" cy="5" r="3" />
                      </svg>{" "}
                      {values.coins}
                    </span>
                  </div>
                  <Stack
                    spacing={3}
                    direction={"row"}
                    className="scrollbar-hide overflow-scroll scroll-smooth mt-2 "
                  >
                    {getProductsName?.map(({ _id, title }) => (
                      <Chip
                        key={_id}
                        avatar={
                          <Avatar>
                            <span className="text-white font-bold">
                              {title.charAt(0)}
                            </span>
                          </Avatar>
                        }
                        label={
                          <span className="font-inter text-white">{title}</span>
                        }
                      />
                    ))}
                  </Stack>
                </section>

                {values?.description && (
                  <div className="rounded-md p-2 bg-gradient-to-r from-amber-100 to-yellow-200 mt-2 text-sm text-gray-800">
                    {values?.description}
                  </div>
                )}

                <List disablePadding>
                  <ListItem className="flex  items-center " disableGutters>
                    <ListItemAvatar
                      disablePadding
                      sx={{ minWidth: "max-content" }}
                    >
                      <Dot />
                    </ListItemAvatar>
                    <h5 className="text-gray-200 pl-1 font-semibold text-sm basis-2/5">
                      Coins
                    </h5>

                    <span className="text-sm">{values?.coins}</span>
                  </ListItem>
                  <Divider />
                  {/* <ListItem className="flex  items-center " disableGutters>
                    <ListItemAvatar
                      disablePadding
                      sx={{ minWidth: "max-content" }}
                    >
                      <Dot />
                    </ListItemAvatar>
                    <h5 className="text-gray-200 pl-1 font-semibold text-sm basis-2/5">
                      Points
                    </h5>

                    <span className="text-sm">{values?.points}</span>
                  </ListItem>
                  <Divider /> */}
                  {/* <ListItem className="flex  items-center " disableGutters>
                    <ListItemAvatar
                      disablePadding
                      sx={{ minWidth: "max-content" }}
                    >
                      <Dot />
                    </ListItemAvatar>
                    <h5 className="text-gray-200 pl-1 font-semibold text-sm basis-2/5">
                      Discount Value
                    </h5>

                    <span className="text-sm">{values?.discountValue}</span>
                  </ListItem> */}
                  <Divider />
                  <ListItem className="flex  items-center " disableGutters>
                    <ListItemAvatar
                      disablePadding
                      sx={{ minWidth: "max-content" }}
                    >
                      <Dot />
                    </ListItemAvatar>

                    <h5 className="text-gray-200 pl-1 font-semibold text-sm basis-2/5">
                      Start Date
                    </h5>

                    <span className="text-sm">
                      {dateFormatting(values?.startDate)?.date}
                    </span>
                  </ListItem>
                  <Divider />
                  <ListItem className="flex  items-center " disableGutters>
                    <ListItemAvatar
                      disablePadding
                      sx={{ minWidth: "max-content" }}
                    >
                      <Dot />
                    </ListItemAvatar>
                    <h5 className="text-gray-200 pl-1 font-semibold text-sm basis-2/5">
                      End Date
                    </h5>

                    <span className="text-sm">
                      {dateFormatting(values?.endDate)?.date}
                    </span>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Rewards;

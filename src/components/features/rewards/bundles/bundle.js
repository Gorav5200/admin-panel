import React, { useEffect, useState } from "react";
import { HeaderWithNavigation } from "../../../common/header";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import BootstrapTextField from "../../../common/bootstrapTextField";
import {
  createHandleChange,
  dateFormatting,
} from "../../../../services/common";
import SingleImageUpload from "../../../common/singleImageUpload";
import { Dot } from "lucide-react";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { useLocation, useParams ,useNavigate} from "react-router-dom";
import { useCreateBundleMutation, useUpdateBundleMutation } from "../../../../services/apis/rewardsApi";
import { rewardsApi } from "../../../../services/Constant";
import { message } from "antd";
import { getValue } from "@testing-library/user-event/dist/utils";
import { useSelector } from "react-redux";
import { BackdropLoader } from "../../../common/lineLoader";
import DatePickerComp from "../../../common/datePicker";


function Bundel() {
  const location=useLocation();
  const navigate=useNavigate();
  const params=useParams();
  const {bundleDetails} = useSelector(state => state.rewards)
  const [values, setValues] = useState(bundleDetails);

  const [createBundle, { isLoading: postLoad, isError: postError }] =useCreateBundleMutation();
   const [updateBundle, { isLoading: updateLoad, isError: updateError }] =useUpdateBundleMutation();


  const handleChange = createHandleChange(values, setValues);


  const handleCreate = async () => {

    try {
      // Call the addMockPackage mutation
      const response = await createBundle({
        endpoint: `${rewardsApi.bundleEndPoint}`,
        data: values,
      });

      console.log("Response:", response);

      if (response && response?.data?.success) {
        message.success("Bundle Added successfully!", 2.5);
        navigate(`/main/rewards`);
      } else {
        message.error("Some error occured to Bundle Referral!", 2.5);
      }
    } catch (error) {
      console.error("Error add Bundle referral:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      // Call the addMockPackage mutation
      const response = await updateBundle({
        endpoint: `${rewardsApi.bundleEndPoint}/${params.bundleId}`,
        updatedData: values,
      });

      console.log("Response:", response);

      if (response && response?.data?.success) {
        message.success("Bundel Update successfully!", 2.5);
        navigate(`/main/rewards/bundle/detail/${params.bundleId}`);
      } else {
        message.error("Some error occured to Update Bundle!", 2.5);
      }
    } catch (error) {
      console.error("Error add Bundel referal:", error);
    }
  };

  const handleSave = (e) => {
    e.preventDefault()
    if (location.pathname.includes("edit") && params.bundleId ) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };


  return (
    <div>
      <BackdropLoader
        isOpen={postLoad || postError || updateLoad || updateError}
      />
      <HeaderWithNavigation
        cont={params.bundleId ? "Edit Coin Bundle" : "Add Coin Bundle"}
      />
      <Paper className="flex gap-3 p-2 ">
        <div className="basis-9/12  h-[90vh] overflow-scroll scroll-smooth">
          <Box
            component="form"
            display={"flex"}
            justifyContent={"space-between"}
            gap={3}
            width={"100%"}
            noValidate
            autoComplete="off"
            padding={2}
            onSubmit={handleSave}
          >
            <div className="basis-[80%] gap-6 flex flex-col">
              <BootstrapTextField
                name="title"
                label="Bundle Title"
                value={values.title}
                onChange={handleChange}
                size="small"
                style={{ display: "flex" }}
              />

              <BootstrapTextField
                name="description"
                label="Bundle Description"
                value={values.description}
                onChange={handleChange}
                size="small"
                multiline
                minRows={4}
                maxRows={7}
              />

              <div className="flex justify-between border p-2  rounded-md gap-2">
                <div className="flex  justify-start items-center gap-4 ">
                  <div>
                    <div>
                      <InputLabel
                        htmlFor="earnValue" // Make sure the htmlFor prop matches the id of the input field
                        shrink
                        sx={{
                          fontSize: 20,
                          fontFamily: "var(--font-inter)",
                          fontWeight: 500,
                          color: "#455564",
                          mt: 2,
                        }}
                      >
                        Price (INR)
                      </InputLabel>
                    </div>
                    <TextField
                      id="price"
                      name="price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                      size="small"
                      variant="outlined"
                      style={{ width: "20ch" }}
                    />
                  </div>
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
                </div>

                <Divider orientation="vertical" variant="middle" flexItem />

                <div className="flex gap-4">
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
            </div>
            {/* Right side div for profile pic */}
            <div className="basis-[20%] flex flex-col justify-between items-center h-[88vh]">
              <div className="image-uploader">
                <SingleImageUpload
                  setData={(val) =>
                    handleChange({
                      target: {
                        name: "image",
                        value: val,
                      },
                    })
                  }
                  data={values.img}
                  circle={true}
                  endpoint={`${rewardsApi.reward.replace(
                    /^\/+/,
                    ""
                  )}/upload/image`}
                />
              </div>
              <CustomButton
                type="submit"
                sx={{
                  ...CustomButtonStyle,
                  width: "150px",
                  height: "40px",
                  borderRadius: 2,
                  float: "right",

                  ml: "auto",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                {params.bundleId ? "Save Changes" : " Save & Create"}
              </CustomButton>
            </div>
          </Box>
        </div>
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
                sx={{ flexDirection: "row-reverse", alignItems: "center" }}
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
              />
              <Divider />

              <CardContent className="flex flex-col gap-4 ">
                {values?.description && (
                  <div className="rounded-md p-2 bg-gradient-to-r from-amber-100 to-yellow-200 mt-2 text-sm text-gray-800">
                    {values?.description}
                  </div>
                )}
                {/* <section>
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


                </section> */}

                <List disablePadding>
                  <ListItem className="flex  items-center " disableGutters>
                    <ListItemAvatar
                      disablePadding
                      sx={{ minWidth: "max-content" }}
                    >
                      <Dot />
                    </ListItemAvatar>
                    <h5 className="text-gray-200 pl-1 font-semibold text-sm basis-2/5">
                      Price
                    </h5>

                    <span className="text-sm"> &#8377; {values?.price}</span>
                  </ListItem>
                  <Divider />
                  <ListItem className="flex  items-center  " disableGutters>
                    <ListItemAvatar
                      disablePadding
                      sx={{ minWidth: "max-content" }}
                    >
                      <Dot />
                    </ListItemAvatar>
                    <h5 className="text-gray-200 pl-1 font-semibold text-sm basis-2/5">
                      Coin Value
                    </h5>

                    <span className="text-sm pl-1">{values?.coins}</span>
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
      </Paper>
    </div>
  );
}

export default Bundel;

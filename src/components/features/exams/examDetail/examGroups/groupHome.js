import * as React from "react";
import Card from "@mui/material/Card";
import {
  CardActionArea,
  Avatar,
  Skeleton,
  IconButton,
  Stack,
  Box,
  InputLabel,
  Pagination,
  PaginationItem,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Divider, Modal } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PlusCircle, X } from "lucide-react";
import { useDispatch } from "react-redux";
import Header from "../../../../common/header";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import BootstrapTextField from "../../../../common/bootstrapTextField";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../styles/muiRoot";
import {
  useGetGroupListQuery,
  useCreateGroupMutation,
} from "../../../../../services/apis/exam/group";
import {
  resetGroupState,
  setGroupDetails,
  setGroupsList,
} from "../../../../../ducks/mockGroupsSlice";
import { toast } from "react-toastify";
import { MultiSelectOutlined } from "../../../../common/selectFields";
import { useGetDataQuery } from "../../../../../services/apis/commonApi";
import DebouncedInput from "../../../../common/searchApiField";
import { useSelector } from "react-redux";

function CreateGroupModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({ title: "", hostId: [] });
  const [errors, setErrors] = React.useState({ title: false, hostId: false });
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({ title: false, hostId: false });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
  };

  const [createGroup, { isLoading, isError }] = useCreateGroupMutation();

  const validateForm = () => {
    const newErrors = {
      title: !value.title.trim(),
      hostId: value.hostId.length === 0,
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.hostId;
  };

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await createGroup({
        endpoint: `/exams/v1/group`,
        newGroup: { ...value, entityType: params.examId },
      });

      console.log("Response:", response);

      if (response && response?.data?.success) {
        console.log("response success", response.data.data);
        toast.success("Group Added! Please fill the details", {
          autoClose: 2000,
          onOpen: () => {
            setValue({ title: "", hostId: [] });
            dispatch(setGroupDetails(response?.data.data));
            navigate(
              `/main/exam/${params.examId}/groups/${response.data.data._id}`
            );
          },
        });
      } else {
        toast.error(
          "Some error occurred while creating the group! Please try again later.",
          {
            autoClose: 2000,
          }
        );
        console.error("Error Group add Response:", response);
      }
    } catch (error) {
      console.error("Error add Group API:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const {
    hostData,
    isLoading: hostLoad,
    isError: hostError,
  } = useGetDataQuery(`/admin/v1/host/list`, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    selectFromResult: ({ data, isLoading, isError }) => {
      if (!isLoading && !isError && data) {
        return { hostData: data?.data.hostList };
      }
      return [];
    },
  });

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<PlusCircle size={18} />}
        onClick={handleOpen}
        sx={{
          backgroundColor: "var(--primary)",
          width: 178,
          height: 46,
          fontFamily: "var(--font-inter)",
          fontSize: 15,
          borderRadius: 2,
          textTransform: "none",
          ml: 1,
          ":hover": {
            backgroundColor: "var(--primary)",
          },
        }}
      >
        Create Group
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <header className="ps-2 flex justify-between items-center">
            <h4 className="text-xl font-inter font-semibold">Create Group</h4>
            <IconButton onClick={handleClose}>
              <X />
            </IconButton>
          </header>
          <div className="w-[627px] mt-7 p-2 flex flex-col gap-4">
            <BootstrapTextField
              label="Group Name:"
              placeholder="Enter name here..."
              required
              error={errors.title}
              helperText={errors.title && "Enter Group Name"}
              size="small"
              onChange={handleChange}
              name="title"
            />
            <div>
              <InputLabel
                shrink
                htmlFor="host"
                sx={{
                  fontSize: 20,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  color: "#455564",
                }}
              >
                Host Id
              </InputLabel>
              <MultiSelectOutlined
                name="hostId"
                size="small"
                labelId="host"
                margin="none"
                onChange={handleChange}
                data={hostData}
                loading={hostLoad}
                error={hostError}
                value={value.hostId}
              />
              <small className="text-red-700">
                {errors.hostId && "Please select Host id"}
              </small>
            </div>
            <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
              <CustomButton
                style={{
                  ...ButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={handleClose}
              >
                Cancel
              </CustomButton>
              <CustomButton
                style={{
                  ...CustomButtonStyle,
                  width: 117,
                  height: 39,
                  borderRadius: 6,
                }}
                onClick={handleSubmit}
              >
                Continue
              </CustomButton>
            </Stack>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function GroupHome() {
 const { activeEntityTitle } = useSelector((state) => state.drawer);
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 20,
    height: 20,
    background: `#EA3434`,
    fontSize: 13,
  }));
  const navigate = useNavigate();
  const params = useParams();
  const examId = params.examId;
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";
  const [data, setData] = React.useState([]);
  const {
    data: getgroupsData,
    isLoading,
    isFetching,
    isError,
  } = useGetGroupListQuery(
    `exams/v1/group/entity/${examId}?page=1&count=${count}&search=${searchTerm}`,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  React.useEffect(() => {
    dispatch(resetGroupState());
  }, []);

  React.useEffect(() => {
    if (getgroupsData) {
      dispatch(setGroupsList(getgroupsData.data));
    }
  }, [getgroupsData]);

  const handleSearch = (term) => {
    navigate(
      `/main/exam/${params.examId}/groups?page=1&count=${count}&search=${term}`
    );
  };
  console.log("groupos dtaa", getgroupsData);
  return (
    <div className="relative bg-white rounded-md">
      <Header content={`${activeEntityTitle}  Groups`} />
      <div className="p-3 flex justify-between items-center gap-4 sticky top-0">
        <div className="basis-1/3">
          <DebouncedInput
            placeholder="Search by Group Name"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
        </div>
        <div className="basis-2/12">
          <CreateGroupModal />
        </div>
      </div>

      <div className=" p-4  bg-white h-[82vh] overflow-scroll scroll-smooth rounded-md m-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-3 gap-5">
          {isLoading || isFetching
            ? Array.from({ length: 20 }).map((_, ind) => (
                <div key={ind} className="skeleton-card">
                  <Skeleton variant="rounded" width={300} height={168} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>
              ))
            : getgroupsData?.data?.map((item, ind) => (
                <Card
                  sx={{
                    maxWidth: 340,
                    minWidth: "auto",
                    borderRadius: 2,
                    height: "max-content",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <CardActionArea
                    sx={{ display: "block" }}
                    onClick={() =>
                      // navigate(`/main/exam/${params.examId}/groups/${item._id}`)
                      navigate(`/main/exam/${params.examId}/groups/${item._id}`)
                    }
                  >
                    <CardContent
                      component="div"
                      alt="green iguana"
                      sx={{
                        height: "12em",
                        p: 0,
                        position: "relative",
                        backgroundImage: `url(${
                          item.coverPic?.[0]?.url ?? "/backgroundImages/bg.png"
                        })`,
                        objectFit: "fill",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <Chip
                        label={
                          <div className="flex gap-2  items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="#FCB461"
                              stroke="#FCB461"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="lucide lucide-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {item.groupType}
                          </div>
                        }
                        color="primary"
                        sx={{
                          borderRadius: "0 0 5px 0",
                          backgroundColor: "rgba(0,0,0,.4)",
                        }}
                      />
                      <div className="absolute bottom-0 w-full">
                        <div className="flex justify-between items-start m-2 p-2">
                          <h3 className="text-white text-xl font-semibold  ">
                            {item.title}(Free)
                          </h3>

                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            badgeContent={
                              <SmallAvatar alt="Count">
                                {item.postCount}
                              </SmallAvatar>
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              // src="/icons/Group4571.svg"
                              sx={{ backgroundColor: "transparent" }}
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.34173 18.2795C7.29143 19.3765 9.56831 19.7514 11.7708 19.3335C14.0447 18.9021 16.0828 17.6554 17.5026 15.8276C18.9223 13.9998 19.626 11.7165 19.4814 9.40663C19.3369 7.09671 18.354 4.91902 16.7175 3.28248C15.0809 1.64593 12.9032 0.663105 10.5933 0.518557C8.28342 0.374008 6.00018 1.07768 4.17237 2.49744C2.34456 3.91719 1.09791 5.95537 0.666511 8.22924C0.248655 10.4317 0.623506 12.7086 1.7205 14.6583L0.890286 17.564C0.829028 17.7784 0.826219 18.0053 0.88215 18.2211C0.938081 18.437 1.05072 18.6339 1.20838 18.7916L1.56123 18.4388L1.20839 18.7916C1.36605 18.9493 1.56302 19.0619 1.77887 19.1178C1.99471 19.1738 2.22158 19.171 2.43598 19.1097L5.34173 18.2795Z"
                                  fill="white"
                                  stroke="#455564"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 15.7683C10.6213 15.7683 11.125 15.2646 11.125 14.6433C11.125 14.022 10.6213 13.5183 10 13.5183C9.37868 13.5183 8.875 14.022 8.875 14.6433C8.875 15.2646 9.37868 15.7683 10 15.7683Z"
                                  fill="#455564"
                                />
                                <path
                                  d="M10 11.2688V10.5188C10.5192 10.5188 11.0267 10.3648 11.4584 10.0764C11.8901 9.78797 12.2265 9.378 12.4252 8.89834C12.6239 8.41869 12.6758 7.89089 12.5746 7.38169C12.4733 6.87249 12.2233 6.40476 11.8562 6.03764C11.489 5.67053 11.0213 5.42052 10.5121 5.31924C10.0029 5.21795 9.47511 5.26994 8.99546 5.46862C8.5158 5.6673 8.10583 6.00375 7.81739 6.43543C7.52895 6.86711 7.375 7.37462 7.375 7.8938"
                                  stroke="#455564"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </Avatar>
                          </Badge>
                        </div>
                      </div>
                    </CardContent>

                    <Divider />
                    <CardContent
                      sx={{ justifyContent: "space-between", display: "flex" }}
                    >
                      <div>
                        <p className="text-secondary  text-sm">Total Users:</p>
                        <h3 className="text-primary font-bold text-base">
                          2.5K
                        </h3>
                      </div>
                      <div>
                        <p className="text-secondary  text-sm">
                          Avg active users:
                        </p>
                        <h3 className="text-primary font-bold text-base">
                          3.5K
                        </h3>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t">
        <Pagination
          page={page}
          count={Math.ceil(data?.data?.totalItems / count) || 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/main/exam/${params.examId}/groups?page=${item.page}&count=${count}&search=${searchTerm}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}

export default GroupHome;

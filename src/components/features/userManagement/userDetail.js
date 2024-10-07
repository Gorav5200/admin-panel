import React, { useEffect, useState } from "react";
import { HeaderWithNavigation } from "../../common/header";
import { Link } from "react-router-dom";
import { Card, CardContent, Stack, Button, Divider } from "@mui/material";
import Icon from "../../common/Icon";
import {
  useGetSingleUserQuery,
  useDeleteUserMutation,
} from "../../../services/apis/users";
import { useParams, useNavigate } from "react-router-dom";
import { usersApi } from "../../../services/Constant";
import { toast } from "react-toastify";
import { Image } from "antd";
import { setAddUser } from "../../../ducks/userSlice";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../../../services/common";

function UserDetail() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});

  const [deleteUser, { isError: isDeleteError, isLoading: deleteLoading }] =
    useDeleteUserMutation();

  const { data, isLoading, error } = useGetSingleUserQuery(
    `${usersApi.endPoint}/${uid}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleDelete = async () => {
    try {
      // Call the deleteUser mutation
      const response = await deleteUser(`${usersApi.endPoint}/${uid}`);
      // Navigate to the desired path after successful deletion
      console.error("Response:", response);
      if (response && response.data.success) {
        // Navigate to the desired path after successful deletion

        toast.error("User deleted successfully!", {
          autoClose: 2000, // Auto close the toast after 3 seconds
          onOpen: () => {
            // Navigate to the desired path after the toast is closed
            navigate("/main/user");
          },
        });
      } else {
        console.error("Error deleting user. Response:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    if (data && data?.data) {
      setDetails(data?.data.data);
    }
  }, [data]);

  const handleEdit = () => {
    const data = {
      ...details,
      exam: details.exam.map((e) => e._id),
      languages: details?.languages?.join(),
    };
    dispatch(setAddUser(data));
    navigate(`/main/user/edit/${uid}`);
  };
  console.log("single user data", details);

  return (
    <>
      {!isLoading && (
        <div className="h-screen overflow-hidden ">
          <HeaderWithNavigation cont={details.name} />
          <div className=" profile-view flex flex-row h-5/6 gap-5 bg-white m-3   p-4 rounded-md overflow-scroll">
            <div className="basis-3/12 ">
              <div className="h-[40%]  p-2 flex justify-center items-center overflow-hidden">
                <Image
                  alt="profile_img"
                  src={details?.profilePic}
                  sx={{
                    width: 400,
                    height: 400,
                    borderRadius: 0,
                    border: "1px solid var(--light-grey)",
                  }}
                />
              </div>

              <Link
                to="/"
                sx={{ textDecoration: "underline" }}
                className="text-darkBlue underline-offset-auto text-sm text-primary font-[500] ms-2"
              >
                View Profile
              </Link>

              <div
                className="events mt-6 h-[43vh] p-2 border rounded-xl overflow-hidden shadow-sm"

              >
                <div className="flex justify-between align-center text-sm font-[600] px-1 pe-3 p-2 bg-medGrey rounded-t-md">
                  <h6>Upcoming Events</h6>
                  <h6 className="text-[#336792] cursor-pointer">
                    View Calendar
                  </h6>
                </div>
<Divider/>
                <div className="overflow-scroll h-full scrollbar-hide pb-5">
                  {[...Array(5)].map((item) => (
                    <Card
                      className="border "
                      sx={{ borderRadius: 3, m: 2, mx: 0 }}
                    >
                      <CardContent className="text-sm text-[#2D2D2D] font-[600] ">
                        <h6>Quants Live - Hardik Dhawan</h6>
                        <p className="font-[400] pt-2 ">21 Aug’21 10:00 PM</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <div className="basis-6/12 text-sm font-inter pl-3  ">
              <section>
                <h5 className="text-xl font-inter font-semibold">
                  Profile Information{" "}
                </h5>
                <ul className="leading-9 mt-3">
                  {[
                    { heading: "Name", value: details?.name },
                    {
                      heading: "Roles",
                      value: details.roles?.map(capitalizeFirstLetter).join(),
                    },
                    { heading: "Email", value: details?.email },
                    { heading: "Mobile", value: details?.phone },

                    {
                      heading: "Langauge",
                      value: details?.languages
                        ?.map(capitalizeFirstLetter)
                        ?.join(),
                    },
                    {
                      heading: "Exams",
                      value: details?.exam?.map((e) => e.title)?.join(),
                    },
                  ].map((item) => (
                    <li className="flex">
                      <h6 className="basis-1/4 text-secondary ">
                        {item.heading}:
                      </h6>
                      {Array.isArray(item.value) ? (
                        <ul className="flex gap-3">
                          {item.value.map((itemValue, index) => (
                            <li key={index}>{itemValue}</li>
                          ))}
                        </ul>
                      ) : (
                        <h6>{item.value}</h6>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="mt-3">
                <h5 className="text-xl font-inter font-semibold">
                  Personal Information
                </h5>
                <ul className="leading-9 mt-3">
                  {[
                    { heading: "DOB", value: details?.dob },
                    {
                      heading: "Gender",
                      value: capitalizeFirstLetter(details?.gender),
                    },
                    { heading: "Age", value: details?.age },
                  ].map((item) => (
                    <li className="flex">
                      <h6 className="basis-1/4 text-secondary ">
                        {item.heading}:
                      </h6>
                      {Array.isArray(item.value) ? (
                        <ul className="flex gap-3">
                          {item.value.map((itemValue, index) => (
                            <li key={index}>{itemValue}</li>
                          ))}
                        </ul>
                      ) : (
                        <h6>{item.value}</h6>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <div className="basis-3/12 ">
              <Stack direction="row" spacing={3} justifyContent={"end"}>
                <Button
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  onClick={handleEdit}
                  startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                >
                  Edit
                </Button>

                <Button
                  onClick={handleDelete}
                  sx={{
                    color: "#455564",
                    fontFamily: "var(--inter)",
                    fontSize: "14px",
                  }}
                  startIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#336792"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  }
                >
                  Delete
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetail;

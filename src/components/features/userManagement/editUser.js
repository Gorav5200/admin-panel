import React from "react";
import { HeaderWithNavigation } from "../../common/header";
import { Link } from "react-router-dom";
import { Card, CardContent, Stack, Button } from "@mui/material";
import Icon from "../../common/Icon";

function EditUser() {
  return (
    <>
      <div className="h-screen overflow-hidden ">
        <HeaderWithNavigation cont="gaurav" />
        <div className=" profile-view flex flex-row h-5/6 gap-5 bg-white m-3   p-4 rounded-md">
          <div className="basis-3/12">
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              alt="no"
              loading="lazy"
              width={350}
              className=" mt-1 cover-full bg-no-repeat"
            />
            <br />
            <Link
              to="/"
              sx={{ textDecoration: "underline" }}
              className="text-darkBlue underline-offset-auto text-sm text-primary font-[500]"
            >
              View Profile
            </Link>
            <div className="events mt-8">
              <div className="flex justify-between align-center text-sm font-[600] px-1 pe-3">
                <h6>Upcoming Events</h6>
                <h6 className="text-[#336792] cursor-pointer">View Calendar</h6>
              </div>
              <div
                className="overflow-scroll"
                style={{
                  minHeight: "250px",
                  maxHeight: "330px",
                  overflowY: "auto",
                }}
              >
                {[...Array(5)].map((item) => (
                  <Card
                    className="border"
                    sx={{ borderRadius: 3, m: 2, ml: 0 }}
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
            <h5 className="text-xl font-inter font-bold">
              Profile Information Name{" "}
            </h5>
            <ul className="leading-9 mt-3">
              {[
                { heading: "Name", value: "Keshav Patel" },
                { heading: "Designation", value: "Teacher" },
                { heading: "Email", value: "info@example.com" },
                { heading: "Langauge", value: "English French Bangla" },
                { heading: "Exams", value: "CAT,GMAT" },
              ].map((item) => (
                <li className="flex">
                  <h6 className="basis-1/4 text-secondary ">{item.heading}:</h6>
                  <h6>{item.value}</h6>
                </li>
              ))}
            </ul>
          </div>
          <div className="basis-3/12 ">
            <Stack direction="row" spacing={3} justifyContent={"end"}>
              <Button
                sx={{
                  color: "#455564",
                  fontFamily: "var(--inter)",
                  fontSize: "14px",
                }}
                startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
              >
                Edit
              </Button>

              <Button
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
    </>
  );
}

export default EditUser;

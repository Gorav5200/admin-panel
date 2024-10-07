import React, { useState } from "react";
import { HeaderWithNavigation } from "../../../../../common/header";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../../../styles/muiRoot";
import { EditIcon, MoreVertical, PlusCircle, Trash } from "lucide-react";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Popover, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setActiveView } from "../../../../../../ducks/exams/specificationSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ExamDetail from "./examDetail";
import Syllabus from "./syllabus";
import Eligibility from "./eligibility";
import ExamTips from "./examTips";
import TopColleges from "./topColleges";
import { ClearAll } from "@mui/icons-material";
import ImportantNews from "./importantNews";

function CreateMain() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeView } = useSelector((state) => state.examSpecification);

  const content = (
    <List>
      <ListItemButton
        sx={{ minWidth: 150 }}
        // onClick={() => {
        //   del(); // Call the 'duplicate' function
        //   handleCloseMenu(); // Close the menu
        // }}
      >
        <ListItemIcon>
          <Trash />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </ListItemButton>
      <Divider />
      <ListItemButton
        sx={{ minWidth: 150 }}
        // onClick={() => {
        //   duplicate(); // Call the 'duplicate' function
        //   handleCloseMenu(); // Close the menu
        // }}
      >
        <ListItemIcon>
          <ClearAll />
        </ListItemIcon>
        <ListItemText primary="Clear" />
      </ListItemButton>
      <Divider />
      <ListItemButton
        sx={{ minWidth: 150 }}
        // onClick={() => {
        //   edit(); // Call the 'duplicate' function
        //   handleCloseMenu(); // Close the menu
        // }}
      >
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </ListItemButton>
    </List>
  );

  return (
    <>
      <div className="h-screen bg-lightGrey ">
        <HeaderWithNavigation
          cont={
            location.pathname.includes("edit")
              ? "Edit Specification"
              : "Create Specification"
          }
        />
        <div className="mt-2 flex p-2 gap-5 h-5/6 overflow-scroll">
          <div className="basis-[20%]">
            <header className="header bg-medGrey">
              <h5 className="text-primary text-base font-bold font-inder p-2">
                Package Specifications
              </h5>
            </header>

            <div>
              <List>
                {[
                  { name: "Exam Details ", value: 0 },
                  { name: "Scoring & Syllabus", value: 1 },
                  { name: "Eligibility & Fees", value: 2 },
                  { name: "Exam Tips", value: 3 },
                  { name: "Important News", value: 4 },
                  { name: "Top Colleges", value: 5 },
                ]?.map((item, ind) => (
                  <ListItem
                    disablePadding
                    sx={{
                      border: "1px solid gray",
                      color:
                        activeView === item.value
                          ? "black"
                          : "var(--secondary)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    secondaryAction={
                      <Space wrap>
                        <Popover
                          content={content}
                          overlayInnerStyle={{
                            padding: 0,
                          }}
                          trigger="hover"
                        >
                          <IconButton edge="end" aria-label="delete">
                            <MoreVertical />
                          </IconButton>
                        </Popover>
                      </Space>
                    }
                  >
                    <ListItemButton
                      sx={{ minWidth: 150 }}
                      key={item.name}
                      onClick={() => dispatch(setActiveView(ind))}
                    >
                      <ListItemText>
                        <h5>{item.name}</h5>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <CustomButton
                disabled={true}
                startIcon={<PlusCircle size={15} />}
                style={{
                  ...ButtonStyle,
                  width: 140,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 16,
                  margin: "10px 0px",
                }}
              >
                Add new tab
              </CustomButton>
            </div>
          </div>

          <div className=" basis-[80%] rounded-md  ">
            {activeView === 0 ? (
              <ExamDetail />
            ) : activeView === 1 ? (
              <Syllabus />
            ) : activeView === 2 ? (
              <Eligibility />
            ) : activeView === 3 ? (
              <ExamTips />
            ) : activeView === 4 ? (
              <ImportantNews />
            ) : activeView === 5 ? (
              <TopColleges />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMain;

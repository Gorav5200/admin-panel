import React, { useState } from "react";
import { HeaderWithNavigation } from "../../../common/header";

import { ChevronRight } from "lucide-react";

import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
} from "@mui/material";
import Icon from "../../../common/Icon";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
import MockTests from "./modules/mockTests";
import Assignments from "./modules/assignments";
import PastPapers from "./modules/pastPapers";
import PracticeQa from "./modules/practiceQa";
import DailyQuiz from "./modules/dailyQuiz";
import ModuleDetails from "./modules/moduleDetails";
import { setActiveView } from "../../../../ducks/addModuleSlice";
import Learn from "./modules/learn";

function CreateMain() {
  const dispatch = useDispatch();
  const { activeView } = useSelector((state) => state.addModule);

  return (
    <>
      <div className="h-screen bg-lightGrey">
        <HeaderWithNavigation cont="Create Module" />
        <div className="my-2 flex p-2 gap-5 h-full">
          <div className="basis-[20%]">
            <header className="header bg-medGrey">
              <h5 className="text-primary text-base font-bold font-inder p-2">
                Module Specifications
              </h5>
            </header>

            <div>
              <List>
                {[
                  {
                    name: "Module Details",
                    value: "details",
                    comp: <ModuleDetails />,
                  },
                  { name: "Mock Test", value: "mocktest", comp: <MockTests /> },
                  {
                    name: "Assignmemts",
                    value: "assignments",
                    comp: <Assignments />,
                  },
                  {
                    name: "Past-papers",
                    value: "pastPapers",
                    comp: <PastPapers />,
                  },
                  {
                    name: "practice Q/A",
                    value: "practiceQa",
                    comp: <PracticeQa />,
                  },
                  {
                    name: "Learn",
                    value: "learn",
                    comp: <Learn />,
                  },
                  {
                    name: "Daily Quiz ",
                    value: "dailyQuiz",
                    comp: <DailyQuiz />,
                  },
                ]?.map((item, _) => (
                  <ListItemButton
                    key={item.name}
                    selected={activeView === item.value}
                    sx={{
                      border: "1px solid gray",
                      color:
                        activeView === item.value
                          ? "black"
                          : "var(--secondary)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => {
                      dispatch(setActiveView(item.value));
                    }}
                  >
                    <ListItemText>
                      <h5>{item.name}</h5>
                    </ListItemText>

                    <ChevronRight />
                  </ListItemButton>
                ))}
              </List>
            </div>
          </div>
          <div className=" basis-[80%] rounded-md  p-2  h-[93%] overflow-scroll bg-white  ">
            {false ? (
              <div className="flex justify-center items-center h-[90%]">
                <div className="mb-4">
                  <RingLoader color="#030807" size={70} />
                  <p className="tracking-[0.3rem] mt-3 text-gray-700 ml-[-10px]">
                    Loading...
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {activeView === "details" ? (
                  <ModuleDetails />
                ) : activeView === "mocktest" ? (
                  <MockTests />
                ) : activeView === "assignments" ? (
                  <Assignments />
                ) : activeView === "pastPapers" ? (
                  <PastPapers />
                ) : activeView === "dailyQuiz" ? (
                  <DailyQuiz />
                ) : activeView === "practiceQa" ? (
                  <PracticeQa />
                ) : activeView === "learn" ? (
                  <Learn />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMain;

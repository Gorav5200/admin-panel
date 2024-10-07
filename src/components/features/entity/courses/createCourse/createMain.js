import React, { useEffect, useState } from "react";
import { HeaderWithNavigation } from "../../../../common/header";

import { ChevronRight } from "lucide-react";
import ModalComp from "../../../../common/modal";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
} from "@mui/material";
import Icon from "../../../../common/Icon";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveView,
  setViewDetail,
} from "../../../../../ducks/exams/courseSlice";
import { RingLoader } from "react-spinners";
import CreateDetail from "./createDetail";
import CreateDescription from "./createDescription";
import WhyIquanta from "./whyIquanta";
import CreateFeatures from "./createFeatures";
import CreateStories from "./createStories";
import CreateStructure from "./createStructure";
import LearnMain from "./modules/modulesMain";
import LinkGroups from "./linkGroups";
import Learn from "./learn";
import Modules from "../viewCourse/modules";
import ModulesMain from "./modules/modulesMain";

function CreateMain() {
  const params = useParams();
  const dispatch = useDispatch();
  const { activeView,  } = useSelector(
    (state) => state.courses
  );
  const {entity} = useSelector(
    (state) => state.entity
  );
 

  return (
    <>
      <div className="h-screen bg-lightGrey">
        <HeaderWithNavigation cont={`${entity?.find((item)=>item._id === params.entityId)?.title} / Create Course`} />
        <div className="my-2 flex p-2 gap-5 h-full">
          <div className="basis-[20%]">
            <header className="header bg-medGrey">
              <h5 className="text-primary text-base font-bold font-inder p-2">
                Package Specifications
              </h5>
            </header>

            <div>
              <List>
                {[
                  { name: "Course Details", value: "details" },
                  { name: "Course description", value: "description" },
                  { name: "Course Modules", value: "modules" },
                  { name: "What will You learn", value: "learn" },
                  { name: "Why iQuanta", value: "why" },
                  { name: "Course Structure", value: "structure" },
                  { name: "Link Groups ", value: "linkGroups" },
                  { name: "Top Features", value: "features" },
                  { name: "Success stories ", value: "stories" },
                
                ]?.map((item, _) => (
                  <ListItemButton
                    key={item.name}
                    sx={{
                      border: "1px solid gray",
                      color:
                        activeView === item.value
                          ? "black"
                          : "var(--secondary)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => dispatch(setActiveView(item.value))}
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
                  <CreateDetail/>
                ) : activeView === "learn" ? 
                <Learn/>  
                :activeView === "why" ? (
                  <WhyIquanta/>
                ):
                activeView === "modules" ? (
                  <ModulesMain/>
                ): activeView === "structure" ? (
                  <CreateStructure/>
                ) : activeView === "features" ? (
                  <CreateFeatures/>
                ) : activeView === "stories" ? (
                  <CreateStories/>
                ) :  activeView === "description" ? (
                  <CreateDescription/>
                ) :activeView === "linkGroups" ? (
                  <LinkGroups/>
                ) :null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMain;

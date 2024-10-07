import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { CustomButton, CustomButtonStyle } from "../../styles/muiRoot";
import {
  ListItemButton,
  Stack,
  Divider,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { ArrowRight, Clock4, Package, PlusCircle } from "lucide-react";
import { BorderLessAccordion } from "../common/accordian";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CreateExam from "../features/exams/createExam/createExam";
import ModalComp from "./modal";
import { useGetEntityListQuery } from "../../services/apis/dataManagement/entity";
import { entityApi, subjectApi } from "../../services/Constant";
import { useLazyGetSubjectQuery } from "../../services/apis/dataManagement/subject";
import { useDispatch } from "react-redux";
import { resetQuestionBank } from "../../ducks/questionBankSlice";
import { setExamDetail } from "../../ducks/exams/examSlice";
import { Empty, message } from "antd";
import { useSelector } from "react-redux";
import { useGetEntitySubCategoryQuery } from "../../services/apis/dataManagement/entityType";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { setEntityList } from "../../ducks/pastPaperSlice";
import { setEntity } from "../../ducks/dataManagementSlice/entitySlice";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import {
  setExpanded,
  setActiveEntityType,
  resetDrawer,
  setActiveEntityTitle,
} from "../../ducks/drawerSlice";
import { capitalizeFirstLetter } from "../../services/common";

const drawerWidth = 210;

function NestedDrawer({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { expanded, activeEntityType } = useSelector((state) => state.drawer);
  const { handleClose, handleOpen, ModalComponent } = ModalComp();
  const [trigger] = useLazyGetSubjectQuery();

  const {
    data: entityList,
    isLoading,
    isError,
    isFetching,
  } = useGetEntitySubCategoryQuery(`${entityApi.endPoint}/list`, {
    refetchOnMountOrArgChange: true,
  });

  React.useEffect(() => {
    dispatch(setEntityList(entityList?.data.entityList));
    dispatch(setEntity(entityList?.data.entityList));
  }, [entityList]); //Set the entities to redux

  React.useEffect(() => {
    if (
      location.pathname === "/main/exam" ||
      location.pathname.includes("/main/exam/learn") ||
      location.pathname.includes("/main/exam/assignment") ||
      location.pathname.includes("/main/exam/pastPapers") ||
      location.pathname.includes("/main/exam/practiceQa") ||
      location.pathname.includes("/main/exam/dailyQuiz") ||
      location.pathname.includes("/main/exam/accelareader")
    ) {
      dispatch(resetDrawer());
    }
  }, [location.pathname]); //for reset the drawer when we click on external links

  const fetchData = async (id) => {
    try {
      const { data, isSuccess, isError } = await trigger(
        `${subjectApi.endPoint}/entity/${id}`
      );

      console.log("🚀 ~ fetchData ~ data:", data);

      if (isSuccess) {
        dispatch(setExamDetail({ subjects: data.data, examId: id }));
        dispatch(resetQuestionBank({}));
      } else if (isError) {
        message.error("Some error occurred");
        return { success: false };
      }
      return { success: true };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { success: false };
    }
  }; //fetch the data of subject list and store in redux exam detail

  //Drawer main
  const drawer = (
    <div
      style={{
        position: "relative",
        zIndex: (theme) => theme.zIndex.modal - 10,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={2}
        alignItems="center"
        padding={1}
        py={2}
      >
        <Typography variant="subheading">Exams</Typography>
        <CustomButton
          style={{ ...CustomButtonStyle, fontSize: 12, height: 40 }}
          onClick={handleOpen}
        >
          Create Exam
        </CustomButton>
      </Stack>

      <CreateExam
        entityList={entityList?.data.entityList}
        ModalComponent={ModalComponent}
        close={handleClose}
      />

      <List sx={{ p: 1 }}>
        <ListItem disablePadding>
          <ListItemText>
            <h6 className="text-secondary text-xs flex">
              <span className="mr-1">
                <Clock4 size={15} />
              </span>
              All Exams
            </h6>
          </ListItemText>
        </ListItem>
        {/* First layer that is entities map here */}
        {entityList?.data.entityList.map((e, ind) => (
          <>
            <ListItemButton
              selected={expanded === e._id}
              key={e._id}
              className="text-xs font-medium text-[#455564] "
              sx={{ px: 0.5 }}
              disableGutters
              dense={true}
              onClick={() => {
                dispatch(setExpanded(e._id)); //for set the entity
                //if accordian is open or not ,behalf of the accordian key beacuse fist index selected,
                //if first index course or class it will be rediect to entity section
                if (
                  e.entityType[0]?.hasOwnProperty("accordian") &&
                  !e.entityType[0].accordian
                ) {
                  const titleUpdate =
                    entityList?.data.entityList[
                      ind
                    ]?.entityType[0]?.title?.toLowerCase();
                  dispatch(setActiveEntityType(titleUpdate));
                  navigate(
                    `/main/entity/${entityList?.data.entityList[ind]?.entityType[0]?._id}/${titleUpdate}`
                  );
                } else {
                  dispatch(
                    setActiveEntityTitle(
                      entityList?.data.entityList[ind]?.entityType[0]?.title
                    )
                  );
                  dispatch(
                    setActiveEntityType(
                      entityList?.data.entityList[ind]?.entityType[0]?._id
                    )
                  ); //for set the first entity type by default
                  navigate(
                    `/main/exam/${entityList?.data.entityList[ind]?.entityType[0]?._id}/qbank`
                  );
                }
                //rediect to question bank by default
              }}
            >
              <ListItemText
                primary={
                  <span className="text-xs font-medium text-[#455564]">
                    {e.title}
                  </span>
                }
              />
              {expanded === e._id ? (
                <ExpandLess size={12} />
              ) : (
                <ExpandMore size={12} />
              )}
            </ListItemButton>
            {/* 2nd layer of entity type --This is the entity types map here */}

            <Collapse
              in={expanded === e._id ? true : false}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {e?.entityType.map(({ title, _id, accordian }) => (
                  <>
                    <ListItemButton
                      sx={{
                        ml: 1.5,
                        mt: 1,
                        pl: 1,
                        color: activeEntityType === _id ? "black" : "#455564",
                      }}
                      selected={
                        title?.toLowerCase() === "course" ||
                        (title?.toLowerCase() === "class" && !accordian)
                          ? activeEntityType === title.toLowerCase()
                          : activeEntityType === _id
                      }
                      disableGutters
                      disablePadding
                      dense={true}
                      key={_id}
                      onClick={async () => {
                        if (activeEntityType !== _id) {
                          const titleUpdate = title.toLowerCase();
                          if (
                            titleUpdate === "course" ||
                            titleUpdate === "class"
                          ) {
                            dispatch(setActiveEntityType(titleUpdate));
                            dispatch(
                              setActiveEntityTitle(
                                capitalizeFirstLetter(titleUpdate)
                              )
                            );
                            navigate(`/main/entity/${_id}/${titleUpdate}`);
                          } else {
                            const { success } = await fetchData(_id);
                            if (!success) {
                              return;
                            } else {
                              dispatch(
                                setActiveEntityTitle(
                                  capitalizeFirstLetter(titleUpdate)
                                )
                              );
                              dispatch(setActiveEntityType(_id));
                              navigate(`/main/exam/${_id}/qbank`);
                            }
                          }
                        }
                      }}
                    >
                      <ListItemText
                        primary={
                          <span className="text-xs font-medium">{title}</span>
                        }
                      />
                    </ListItemButton>
                    {/* 3rd layer */}
                    <Collapse
                      in={activeEntityType === _id ? true : false}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="pl-4 mt-0.5">
                        {<ContentComp examId={activeEntityType} />}
                      </div>
                    </Collapse>
                  </>
                ))}
              </List>
            </Collapse>
          </>
        ))}

        <Divider />

        <ListItem disablePadding>
          <div className="flex flex-col w-full">
            <List>
              {[
                { value: "learn", title: "Learn" },
                { value: "assignment", title: "Assignment" },
                { value: "pastPapers", title: "Past-Papers" },
                { value: "practiceQa", title: "Practice Q/A" },
                { value: "dailyQuiz", title: "Daily Quiz" },
                { value: "accelareader", title: "Accelareader" },
              ].map((e) => (
                <ListItemButton
                  key={e._id}
                  sx={{
                    px: 0.5,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  selected={location.pathname.includes(`/main/exam/${e.value}`)}
                  onClick={() => navigate(`/main/exam/${e.value}`)}
                  // ${e._id}/
                >
                  <h6 className="text-xs font-medium text-[#455564]">
                    {e.title.toUpperCase()}
                  </h6>
                </ListItemButton>
              ))}
            </List>
          </div>
        </ListItem>

        <FloatButton.Group
          trigger="hover"
          style={{
            position: "fixed",
            bottom: 20,
            left: drawerWidth ? `calc(${drawerWidth}px + 15px)` : undefined,
          }}
          icon={<PlusCircleOutlined />}
        >
          <FloatButton
            icon={<Package />}
            tooltip="Add Module"
            // className="custom-float-btn "
            onClick={() => navigate("/main/exam/module")}
          />
        </FloatButton.Group>
      </List>
    </div>
  );

  if (isError) {
    return <Empty />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          paddingRight: 10,
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              position: "absolute",
              zIndex: 800,
              paddingRight: 1,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box sx={{ width: "100%" }}>{children}</Box>
    </Box>
  );
}

NestedDrawer.propTypes = {
  window: PropTypes.func,
};

export default NestedDrawer;

//redirections all through exam id -- that is active entity type
const ContentComp = ({ examId }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const navigationItems = [
    {
      name: "Summary",
      path:`/main/exam/${examId}/summary`,
      searchTerm:"summary",
    },
    {
      name: "Specification",
      path: `/main/exam/${examId}/specification`,
      searchTerm:"specification",
    },
    {
      name: "Classes",
      path: `/main/exam/${examId}/class`,
      reset: false,
      searchTerm: "class",
    },
    {
      name: "Groups",
      path: `/main/exam/${examId}/groups`,
      reset: false,
      searchTerm: "groups",
    },
    {
      name: "Courses",
      path: `/main/exam/${examId}/courses`,
      reset: false,
      searchTerm: "courses",
    },
    {
      name: "Mock Test",
      path: `/main/exam/${examId}/mocks`,
      reset: false,
      searchTerm: "mocks",
    },
    {
      name: "Question Bank",
      path: `/main/exam/${examId}/qbank`,
      reset: true,
      searchTerm: "qbank",
    },
  ];

  return (
    <div className="flex flex-col">
      {navigationItems.map((item, index) => (
        <div
          key={index}
          className={`px-2 py-1 ${
            item.searchTerm && location.pathname.includes(item.searchTerm)
              ? "border-l-2 border-gray-500 font-bold ease-in-out duration-200"
              : "border-l-2"
          }`}
          onClick={() => {
            item.reset && dispatch(setExamDetail({ examId: examId }));
            item.reset && dispatch(resetQuestionBank({}));
          }}
        >
          <Link
            to={item.path}
            className="text-[#455564] text-xs flex cursor-pointer p-1"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

// const ExamContent = ({ entityType, entityId }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [trigger] = useLazyGetSubjectQuery();

//   const [expanded, setExpanded] = React.useState(null);

//   const fetchData = async (id) => {
//     try {
//       const { data, isSuccess, isError } = await trigger(
//         `${subjectApi.endPoint}/entity/${id}`
//       );

//       console.log("🚀 ~ fetchData ~ data:", data);

//       if (isSuccess) {
//         dispatch(setExamDetail({ subjects: data.data, examId: id }));
//         dispatch(resetQuestionBank({}));
//       } else if (isError) {
//         message.error("Some error occurred");
//         return { success: false };
//       }
//       return { success: true };
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return { success: false };
//     }
//   };

//   const handleChange = (panel) => async (event, newExpanded) => {
//     if (newExpanded) {
//       const { success } = await fetchData(panel);
//       if (!success) {
//         return;
//       }
//     }

//     setExpanded(newExpanded ? panel : false);
//   };

//   return (
//     <>
//       {entityType?.map((e) => (
//         <Box sx={{ width: "100%" }}>
//           {e?.accordian === false ? (
//             <ListItem
//               secondaryAction={<ArrowRight size={15} color="#878787" />}
//               sx={{
//                 p: 0,
//                 m: 0,
//                 "& .css-518kzi-MuiListItemSecondaryAction-root": { right: 0 },
//               }}
//             >
//               <ListItemButton
//                 onClick={async () => {
//                   const { success } = await fetchData(e._id);
//                   if (!success) {
//                     return;
//                   }
//                   navigate(
//                     `/main/entity/${entityId}/${e.title?.toLowerCase()}`
//                   );
//                 }}
//                 key={e._id}
//                 sx={{
//                   px: 0.5,
//                   py: 1.5,
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {/* handleClick(e._id) */}
//                 {/* .then(()=>navigate(`/main/entity/${entityId}/${e.title?.toLowerCase()}`)) */}
//                 <h6 className="text-xs font-medium text-[#455564]">
//                   {e.title.toUpperCase()}
//                 </h6>
//               </ListItemButton>
//             </ListItem>
//           ) : (
//             <Accordion
//               expanded={expanded === e._id}
//               onChange={handleChange(e._id)}
//             >
//               <AccordionSummary
//                 aria-controls="content"
//                 id="header"
//                 sx={{ padding: 0, minHeight: 37 }}
//               >
//                 <Link key={e._id} to={`/main/exam/${e._id}/qbank`}>
//                   <h6 className="text-xs font-medium text-[#455564]">
//                     {e.title.toUpperCase()}
//                   </h6>
//                 </Link>
//               </AccordionSummary>
//               <AccordionDetails>
//                 {<ContentComp examId={e._id} />}
//               </AccordionDetails>
//             </Accordion>
//           )}
//         </Box>
//       ))}
//     </>
//   );
// };

// 3rd and the last layer -----> navigation inner components

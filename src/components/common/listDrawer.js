import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { CustomButton, CustomButtonStyle } from "../../styles/muiRoot";
import { Stack } from "@mui/material";
import { Clock4 } from "lucide-react";
import { BorderLessAccordion } from "../common/accordian";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CreateExam from "../features/exams/createExam/createExam";
import ModalComp from "./modal";
import { useGetEntityListQuery } from "../../services/apis/dataManagement/entity";
import { entityApi } from "../../services/Constant";
const drawerWidth = 210;

function ListDrawer({ window, children,entityTypeList}) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {
    data: entityList,
    isLoading,
    isError,
    refetch,
  } = useGetEntityListQuery(entityApi.endPoint,{
    refetchOnMountOrArgChange: true,
  });
 
  const {handleClose,handleOpen,ModalComponent}=ModalComp();
  const drawer = (
    <div>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        gap={2}
        alignItems={"center"}
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
      <CreateExam  entityList={entityList?.data} ModalComponent={ModalComponent} close={handleClose}/>

      <Divider />
      <List sx={{ p: 1 }}>
        <ListItem disablePadding>
          <ListItemText>
            <h6 className="text-secondary text-xs flex">
              {" "}
              <span className="mr-1">
                <Clock4 size={15} />
              </span>{" "}
              Recetly Viewed
            </h6>
          </ListItemText>
        </ListItem>

        <ListItem disablePadding>
          <div className="flex flex-col w-full">
            {entityTypeList?.map((e, ind) => (
              <BorderLessAccordion
                id={ind}
                header={<h6 className=" text-xs font-medium text-[#455564]">{e.title}</h6>}
                content={<ContentComp />}
              />
            ))}
          </div>
        </ListItem>
      </List>
      <Divider />
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

        <ListItem disablePadding>
          <div className="flex flex-col w-full">
            {entityTypeList?.map((e, ind) => (
              <BorderLessAccordion
                id={ind}
                header={<h6 className=" text-xs font-medium text-[#455564]">{e.title}</h6>}
                content={<ContentComp />}
              />
            ))}
          </div>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, paddingRight: 10 }}
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
              zIndex: 1000,
              paddingRight: 1
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

ListDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ListDrawer;

const ContentComp = () => {
  const navigate = useNavigate();
  const params=useParams();
  const location=useLocation();
  const [activeLink, setActiveLink] = React.useState(1);
  console.log("params in  nested drawe", params)
  console.log("location in  nested drawe", location)

  return (
    <div className="flex flex-col ">
      {[
        {name:"CAT Summary",  path:"/"},
       {name: "CAT Groups",  path:"/"},
       {name: "CAT Courses",  path:"/"},
       {name: "CAT Summary",  path:"/"},
       {name: "CAT Groups",  path:"/"},
        {name:"CAT Courses",  path:`/main/exam`},
        {name:"Mock Test",  path:`/main/exam/1/mocks`},
      ]?.map((e, index) => {
        return(<div className={`px-2 py-1 ${location.pathname === e.path? "border-l-2 border-gray-500 font-bold ease-in-out duration-200" : "border-l-2" }`}>
          <Link  to={`${e.path}`} className="text-[#455564] text-xs flex cursor-pointer p-1">{e.name}</Link>

        </div>);
      })}
    </div>
  );
};

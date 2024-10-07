import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const DrawerInfo = [
  {
    icon: "/icons/Dashboard.png",
    name: "Dashboard",
    path: "",
  },
  {
    icon: "/icons/Exams.png",
    name: "Exams",
    path: "/main/exam",
  },
  {
    icon: "/icons/InterestGroups.png",
    name: "Interest Groups",
    path: "/main/interest/groups",
  },
  {
    icon: "/icons/Sales.png",
    name: "Sales",
    path: "/main/sales",
  },
  {
    icon: "/icons/Rewards.png",
    name: "Rewards",
    path: "/main/rewards",
  },
  {
    icon: "/icons/Student.png",
    name: "Students",
    path: "",
  },
  {
    icon: "/icons/StudyRoom.png",
    name: "Study Room",
    path: "/main/ticket",
  },
  {
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0NTU1NjQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRpY2tldCI+PHBhdGggZD0iTTIgOWEzIDMgMCAwIDEgMCA2djJhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0ydi0yYTMgMyAwIDAgMSAwLTZWN2EyIDIgMCAwIDAtMi0ySDRhMiAyIDAgMCAwLTIgMloiLz48cGF0aCBkPSJNMTMgNXYyIi8+PHBhdGggZD0iTTEzIDE3djIiLz48cGF0aCBkPSJNMTMgMTF2MiIvPjwvc3ZnPg==",
    name: "Doubt Management",
    path: "/main/doubt",
  },
  {
    icon: "/icons/FAQ.png",
    name: "Data Management",
    path: "/main/data",
  },
  {
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0NzQ3NDciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYWxlbmRhci1jbG9jayI+PHBhdGggZD0iTTIxIDcuNVY2YTIgMiAwIDAgMC0yLTJINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMy41Ii8+PHBhdGggZD0iTTE2IDJ2NCIvPjxwYXRoIGQ9Ik04IDJ2NCIvPjxwYXRoIGQ9Ik0zIDEwaDUiLz48cGF0aCBkPSJNMTcuNSAxNy41IDE2IDE2LjNWMTQiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2Ii8+PC9zdmc+",
    name: "Event Management",
    path: "/main/events",
  },
  {
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0NTQ1NDUiIHN0cm9rZS13aWR0aD0iMS43NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1mbGFtZSI+PHBhdGggZD0iTTguNSAxNC41QTIuNSAyLjUgMCAwIDAgMTEgMTJjMC0xLjM4LS41LTItMS0zLTEuMDcyLTIuMTQzLS4yMjQtNC4wNTQgMi02IC41IDIuNSAyIDQuOSA0IDYuNSAyIDEuNiAzIDMuNSAzIDUuNWE3IDcgMCAxIDEtMTQgMGMwLTEuMTUzLjQzMy0yLjI5NCAxLTNhMi41IDIuNSAwIDAgMCAyLjUgMi41eiIvPjwvc3ZnPg==",
    name: "Daily Streak",
    path: "/main/dailyStreak",
  },
  {
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0ZjRmNGYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1maWxlLXZpZGVvIj48cGF0aCBkPSJNMTUgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjdaIi8+PHBhdGggZD0iTTE0IDJ2NGEyIDIgMCAwIDAgMiAyaDQiLz48cGF0aCBkPSJtMTAgMTEgNSAzLTUgM3YtNloiLz48L3N2Zz4=",
    name: "Video Bank",
    path: "/main/video/bank",
  },
  {
    icon: "/icons/Blog.png",
    name: "Blog",
    path: "/main/blogs",
  },

  {
    icon: "/icons/UserManagement.png",
    name: "User Management",
    path: "/main/user",
  },
  {
    icon: "/icons/FAQ.png",
    name: "FAQ",
    path: "/main/faq",
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  zIndex: theme.zIndex.drawer,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawer = () => {
    setOpen(!open);
  };
  const handleClick = (path) => {
    navigate(path);
    if (open) {
      setOpen(false);
    }
  };

  return (
    <Box>


      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: open && "space-between", pt: 1 }}>
          <Box
            component="img"
            sx={{ opacity: open ? 1 : 0, ml: 2 }}
            src="/backgroundImages/iQuanta.png"
          />
          <IconButton onClick={handleDrawer}>
            {open ? (
              <CloseRoundedIcon className="text-primary" />
            ) : (
              <MenuRoundedIcon className="text-primary" />
            )}
          </IconButton>
        </DrawerHeader>

        <List  >
          {DrawerInfo?.slice(0, DrawerInfo.length - 3).map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }} >
              <ListItemButton
           
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  mt: 1,
                  "&:hover": {
            transform: "scale(1.05)",
            transition: "all   0.3s ease-in-out", // Add ease-in-out transition
          },
                }}
                onClick={() => handleClick(data.path)}
              >
                <ListItemIcon
             
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                   
          
                  }}
                >
                  <img src={data.icon} alt={data.name} />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  <Typography variant="text">{data.name}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <List style={{ marginTop: "auto" }}  >
          {DrawerInfo?.slice(DrawerInfo.length - 3).map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  mt: 1,
                  "&:hover": {
            transform: "scale(1.1)",
            transition: "all   0.2s ease-in-out", // Add ease-in-out transition
          },
                }}
                onClick={() => handleClick(data.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img   src={data.icon}></img>{" "}
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  <Typography variant="text">{data.name}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

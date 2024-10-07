import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { ListItemIcon } from "@mui/material";
import { ChevronRight } from "lucide-react";
import Privacy from "./privacy";
import LinkGroups from "./linkGroups";
import BlockedUser from "./blockedUser";
import Manage from "./manage";
import LinkCourses from "./linkCourses";

function GroupSetting({ handleUpdate }) {
  const [view, setView] = useState("privacy");
  return (
    <div className="w-full flex  h-[50vh] overflow-scroll m-0">
      <nav className=" basis-[20%]">
        <List disablePadding sx={{ width: "100%" }}>
          {[
            {
              name: "Privacy",
              comp: "privacy",
            },
            {
              name: "Link Groups",
              comp: "linkGroups",
            },
            {
              name: "Blocked Users",
              comp: "blockedUsers",
            },
            {
              name: "Manage",
              comp: "manage",
            },
            {
              name: "Linked Courses",
              comp: "linkCourses",
            },
          ].map((item, i) => (
            <>
              <ListItem
                disablePadding
                className={i === 0 ? "border-l border-t" : "border-l  "}
              >
                <ListItemButton
                  onClick={() => setView(item.comp)}
                  sx={{
                    backgroundColor: view === item.comp && "var(--light-grey)",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <ListItemText primary={item.name} />
                  <ListItemIcon sx={{ pl: 5 }}>
                    <ChevronRight />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </nav>
      <div className="p-3 basis-[80%] border-l">
        {view === "privacy" ? (
          <Privacy handleUpdate={handleUpdate} />
        ) : view === "linkGroups" ? (
          <LinkGroups />
        ) : view === "blockedUsers" ? (
          <BlockedUser />
        ) : view === "manage" ? (
          <Manage/>
        ) : view === "linkCourses" ? (
          <LinkCourses />
        ) : null}
      </div>
    </div>
  );
}

export default GroupSetting;

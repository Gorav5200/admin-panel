import React from "react";
import { Container, Grid, Button, Typography, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import BadgeAvatars from "./styleBadge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Header({ content, subHeading }) {
  return (
    <header className="flex items-center gap-3 sticky top-0  p-2 justify-between bg-medGrey z-50">
      <h2 className="text-darkblue text-2xl font-[600] font-inder">
        {content}
        <span className="text-base font-inter italic"> {subHeading}</span>
      </h2>

      <Stack direction="row" spacing={2}>
        <BadgeAvatars
          icon={
            <NotificationsNoneOutlinedIcon
              sx={{
                width: 40,
                height: 40,
                fontWeight: 200,
                color: "var(--primary)",
              }}
            />
          }
        />
        <Avatar
          alt="Remy Sharp"
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
          sx={{
            width: 40,
            height: 40,
            border: "1px solid #5146D6",
            cursor: "pointer",
          }}
        />
      </Stack>
    </header>
  );
}
export default Header;

export const HeaderWithNavigation = ({ cont }) => {
  const navigate = useNavigate();
  return (
    <header className="header flex items-center gap-3 sticky top-0  bg-medGrey p-2">
      <IconButton
        aria-label="back"
        sx={{ background: "white", ":hover": { background: "white" } }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="text-primary" />
      </IconButton>

      <h2 className="text-darkblue text-2xl font-bold font-inder">{cont}</h2>
    </header>
  );
};

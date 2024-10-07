// VideoPlayer.js

import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Card,
  Typography,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Link, PlayCircle } from "lucide-react";



const VideoPlayer = ({ videoUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="font-inter border p-1 rounded-full w-max px-1 text-sm flex items-center  float-right ">
       Video : <Chip  avatar={<Avatar >{<Link size={18}/>}</Avatar>}   sx={{maxWidth:"200px",ml:1}} onClick={handleOpen} label={
       <span className="hover:text-blue-400">{videoUrl}</span>
       
       }>

       </Chip>

      <Modal open={open} onClose={handleClose}>
        <Box className="modalRoot">
          <video controls width="100%" height="auto" src={videoUrl} />
        </Box>
      </Modal>
    </div>
  );
};

export default VideoPlayer;

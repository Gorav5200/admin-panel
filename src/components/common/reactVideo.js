import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Box, Button, Slider, Typography } from "@mui/material";

const ReactVideoPlayer = ({ videoUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);



  return (


      <Box
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          boxShadow: 2,
        
          position: "relative",
        }}
      >
        <ReactPlayer
          url={videoUrl}
    
          width="100%"
          height="100%"
          controls
        />
      </Box>


  );
};

export default ReactVideoPlayer;

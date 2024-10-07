import * as React from "react";
import { styled, IconButton, Box } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload({ setData ,data}) {
  const fileInputRef = React.useRef(null);


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("video file", file)
    if (file) {
      setData(file);
    }
  };

  const handleButtonClick = () => {
    // Trigger a click event on the hidden input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      {data ? (
        <Box
          sx={{
            borderRadius: "10px",
            overflow: "hidden",
            width: "343px",
            height: "242px",
            boxShadow: 2,
            p: 1,
          }}
        >
          <IconButton
            className="float-right"
            onClick={() => {
              setData(null);
            }}
          >
            <CloseIcon />
          </IconButton>

          <video width="100%" height="100%" controls>
            <source src={URL.createObjectURL(data)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      ) : (
        <>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleButtonClick}
            sx={{
              background: "black",
              color: "white",
              borderRadius: 2,
              ":hover": { background: "black" },
            }}
          >
            Upload Video
          </Button>
        </>
      )}

      <VisuallyHiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="video/mp4"
      />
    </div>
  );
}

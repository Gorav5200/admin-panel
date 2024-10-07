import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Box, Slider, Button, IconButton } from "@mui/material";
import { FcAddImage } from "react-icons/fc";
import "../../styles/imageUpload.css"; // Make sure to create this CSS file for styling
import Icon from "./Icon";

const ImageUploader = ({setData,data}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);
  const editorRef = useRef();
  const inputRef = useRef(); // Define the inputRef here

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log("file", event.target.files);
    console.log("reader", reader);
    console.log("file",file)


    reader.onload = () => {
      setData(file);
      setIsModalOpen(true);
    };

    if (file) {
      reader.readAsDataURL(file);
   
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const imageUrl = canvas.toDataURL();
      setPreviewImage(imageUrl);
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => {
    inputRef.current.value = null;
    setPreviewImage(null);
    setData(null);
    setIsModalOpen(false); // Close the modal when deleting the image
    setSliderValue(10); // Reset the slider value to its initial value
  };

  return (
    <>
      <main className="mycontainer">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleInputChange}
          style={{ display: "none" }}
        />

        <div>
          {previewImage ? (
            <>
              <div className="img-container">
                <IconButton
                  onClick={handleDelete}
                  className="icon "
                  sx={{
                    color: "black",
                    backgroundColor: "#d4d3cf",
                    fontSize: 15,
                    ":hover": { background: "#d4d3cf" },
                  }}
                >
                  <Icon name="X" size="15" />
                </IconButton>

                <img
                  src={
                    previewImage ||
                    "https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
                  }
                  alt=""
                  width="300"
                  height="250"
                  className="border-2 relative top-0"
                />
              </div>
            </>
          ) : (
            <div className="add-icon-container ">
              <div>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <FcAddImage
                    className="add-icon"
                    onClick={() => inputRef.current.click()}
                  />
                </a>
                <small>Click to select image</small>
              </div>
            </div>
          )}
        </div>
      </main>

      <Modal open={isModalOpen}>
        <Box sx={{ width: 400, height: 500, mx: "auto", mt: 5, p: 2 }}>
          <AvatarEditor
            ref={editorRef}
            image={data}
            width={300}
            height={300}
            border={5}
            borderRadius={0}
            color={[0, 0, 0, 0.72]}
            scale={sliderValue / 10}
            rotate={0}
          />

          <Slider
            min={10}
            max={50}
            sx={{ mt: 2 }}
            size="small"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
          />

          <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ImageUploader;

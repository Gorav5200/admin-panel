import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { useTheme } from "styled-components";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const SingleImageUpload = ({ setData, data, circle, endpoint }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
 
  const [fileList, setFileList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(data){
      setFileList({
        uid: "-1",
        name: "image.png",
        status: "done",
        url: data ,
     
    })
    }else{
     
      setFileList(null)
    }
  }, [data])
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    } else {
      const isLt2M = file.size / 1024 / 1024 < 2; // Adjust the size limit as needed
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return isImage && isLt2M;
    }

  };

  
  const handleChange = ({ file }) => {
    // Check if the file is removed
    if (file.status === "removed") {
      setFileList(null);
      setData(null);
      
    } else {
      // Update the state with the selected file
      setFileList(file || null);

      if (file.status === "uploading") {
        setLoading(true);
        return;
      }

      if (file.status === "done") {
        const responseData = file.response;
        setLoading(false);

        setData(responseData.data);

        // You may also want to reset the fileList state if needed
        // setFileList(null);
      }
      if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
        setLoading(false);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // useEffect(() => {

  //   if (data) {

  //     const imageUrl = data;
  //     setFileList([
  //       {
  //         uid: "-1",
  //         name:'image.png',
  //         status: "done",
  //         url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //       },
  //     ]);

  //   }
  // }, []);

  console.log("🚀 ~ SingleImageUpload ~ file list:", fileList, data);

  return (
    <>
      <Upload
        accept="image/*"

        action={`${process.env.REACT_APP_BASE_URL}/${endpoint}`}
        name="image" // Set the field name to 'image'
        listType={circle ? "picture-circle" : "picture-card"}
        fileList={fileList ? [fileList] : []}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
        style={{ width: "100%", height: "100%" }}

      >
        {fileList ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        zIndex={1300}
      >
        <img
          alt="example"
          style={{
            width: "100%", // Adjust this value as needed
            height: "100%", // Adjust the height as needed
            objectFit: "contain",
            // Preserve aspect ratio
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default SingleImageUpload;

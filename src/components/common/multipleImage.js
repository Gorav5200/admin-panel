import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MultipleImageUpload = ({ setData, data, circle, endpoint }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFileList(data?.map((image) => ({ url: image })));
    } else {
      setFileList([]);
    
    }
  }, [data]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    let imagesToPreview = [];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  
    // Add the current file to the images to preview
    imagesToPreview.push({ url: file.url || file.preview });
  
    // Update the preview images state
    setPreviewImages(imagesToPreview);
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

  const handleChange = ({ fileList, file }) => {
    if (file.status === "done") {
      const responseData = file.response;
      setLoading(false);
      setData([...data, responseData.data]);
    }
    else if (file.status === "removed") {
      const removedImageUrl = file.url; 
      const updatedData = data?.filter(imageUrl => imageUrl !== removedImageUrl); 
      setData(updatedData);
    }
    if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
      setLoading(false);
    }
    setFileList([...fileList]);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        accept="image/*"
        action={`${process.env.REACT_APP_BASE_URL}/${endpoint}`}
        name="image" // Set the field name to 'image'
        listType={circle ? "picture-circle" : "picture-card"}
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        zIndex={1300}
      >
        <div>
          {previewImages.map((image, index) => (
            <img
              key={index}
              alt={`preview-${index}`}
              style={{ width: "100%", marginBottom: 16 }}
              src={image.url}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default MultipleImageUpload;

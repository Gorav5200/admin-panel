import React, { useState, useEffect } from "react";
import { Upload, Modal, message } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { CustomButton, ButtonStyle } from "../../styles/muiRoot";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadComponent = ({ setData, data, url, ...props }) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formattedFileList = data.map((item, index) => ({
        uid: `${index}`,
        name: item.file,
        status: "done",
        url: item.data,
      }));
      setFileList(formattedFileList);
    } else {
      setFileList([]);
    }
  }, [data]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      if (file.type.startsWith("image/")) {
        file.preview = await getBase64(file.originFileObj);
      } else if (
        file.type.startsWith("video/") ||
        file.type === "application/pdf" ||
        file.type === "application/vnd.ms-powerpoint" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        file.preview = URL.createObjectURL(file.originFileObj);
      }
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const beforeUpload = (file) => {
    const isAcceptedType =
      file.type.startsWith("image/") ||
      file.type === "application/pdf" ||
      file.type === "application/vnd.ms-powerpoint" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      file.type.startsWith("video/");

    if (!isAcceptedType) {
      message.error("You can only upload image, PDF, PPT, or video files!");
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("File must be smaller than 10MB!");
      return false;
    }

    return true;
  };

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    if (info.file.status === "removed") {
      newFileList = newFileList.filter((file) => file.uid !== info.file.uid);
      setFileList(newFileList);
      setData(newFileList.map((file) => ({ data: file.url, file: file.name })));
    }

    if (info.file.status === "uploading") {
      setLoading(true);
      setFileList(newFileList);
      return;
    }

    if (info.file.status === "done") {
      setLoading(false);
      const response = info.file.response;

      if (response && response.success) {
        newFileList = newFileList.map((file) => {
          if (file.uid === info.file.uid && response.data) {
            file.url = response.data;
            file.status = "done";
          }
          return file;
        });
        setFileList(newFileList);
        setData(
          newFileList.map((file) => ({ data: file.url, file: file.name }))
        );
        message.success(`${info.file.name} file uploaded successfully`);
      } else {
        message.error(`${info.file.name} file upload failed.`);
      }
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <CustomButton
      sx={{ ...ButtonStyle, height: 40, width: 120, borderRadius: 2 }}
      startIcon={loading ? <LoadingOutlined /> : <UploadOutlined />}
    >
      {loading ? "Uploading" : "Upload"}
    </CustomButton>
  );

  return (
    <>
      <Upload
        accept=".pdf,.ppt,.pptx,image/*,video/*"
        action={`${process.env.REACT_APP_BASE_URL}/${url}`}
        name="file"
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
        multiple
        {...props}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        zIndex={1300}
      >
        {previewImage.startsWith("data:video/") ||
        previewImage.endsWith(".mp4") ? (
          <video style={{ width: "100%" }} controls>
            <source src={previewImage} />
            Your browser does not support the video tag.
          </video>
        ) : previewImage.endsWith(".pdf") ? (
          <iframe
            title="PDF Preview"
            src={previewImage}
            style={{ width: "100%", height: "70vh" }}
            frameBorder="0"
          />
        ) : (
          <img
            alt="example"
            style={{ width: "100%", height: "50vh", objectFit: "contain" }}
            src={previewImage}
          />
        )}
      </Modal>
    </>
  );
};

export default UploadComponent;

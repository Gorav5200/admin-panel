import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const VideoUpload = ({ setValue, url, value }) => {
  // Initialize fileList state with an empty array
  const [fileList, setFileList] = useState([]);

  // Update fileList when the 'value' prop changes
  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: "-1",
          name: value,
          status: "done",
          url: value
        }
      ]);
    } else {
      setFileList([]); // Clear fileList when value is null
    }
  }, [value]);
  // Props for the Upload component
  const props = {
    name: 'media',
    action: `${process.env.REACT_APP_BASE_URL}/${url}`,
    accept: '.mp4,.avi', // Accept only mp4 and avi files
     fileList:fileList, // Pass fileList as props
    onChange(info) {
      let newFileList = [...info.fileList];
      newFileList = newFileList.slice(-1); // Allow only one file
      setFileList(newFileList);
      const { status, response } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === "removed") {
        setValue(null); // Update value to null when file is removed
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setValue(response.data);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    maxCount: 1,
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
      </p>
    </Dragger>
  );
};

export default VideoUpload;

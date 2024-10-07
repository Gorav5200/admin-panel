// import { UploadOutlined } from '@ant-design/icons';
// import {Upload } from 'antd';
// import { Button } from '@mui/material';
// import React from 'react';
// import { CustomButton ,ButtonStyle} from '../../styles/muiRoot';
// const props = {
//   action: '//jsonplaceholder.typicode.com/posts/',
//   listType: 'picture',
//   accept: '.pdf,.ppt,.pptx',
//   previewFile(file) {
//     console.log('Your upload file:', file);
//     // Your process logic. Here we just mock to the same file
//     return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
//       method: 'POST',
//       body: file,
//     })
//       .then((res) => res.json())
//       .then(({ thumbnail }) => thumbnail);
//   },
// };
// const UploadFile = ({setData ,data}) => (
//   <Upload {...props}>
//     <CustomButton sx={{...ButtonStyle, height:40,width:120,borderRadius:2}}  startIcon={<UploadOutlined />}>Add Notes</CustomButton>
//   </Upload>
// );
// export default UploadFile;
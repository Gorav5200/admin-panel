import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

function TextSpace({ handleChange, value, id, placeholder }) {
  //   const handleChange = (html) =>e=> {

  //   const name = e.target.name;
  //   //let value = e.target.value;
  //   setValues((prev)=>({...prev,[name]:html}))
  //   };

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "tables",
    "script",
  ];

  return (
    <>
      <ReactQuill
        id={id}
        value={value}
        modules={modules}
        onChange={handleChange}
        placeholder={placeholder || "Write something..."}
        formats={formats}
        // props
      />
    </>
  );
}

export default TextSpace;

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

function QuillEditor({ setValue, value, id, ...props }) {
  const handleChange = (html) => {
    setValue(html);
  };

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
        placeholder={props.placeholder || "Write something..."}
        formats={formats}
        props
      />
    </>
  );
}

export default QuillEditor;

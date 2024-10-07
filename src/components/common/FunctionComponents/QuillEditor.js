// import React, { useRef, useState, useEffect } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css"; // Import Quill's CSS


// const TextEditor = () => {
//   const [range, setRange] = useState(null);
//   const [lastChange, setLastChange] = useState(null);
//   const [readOnly, setReadOnly] = useState(false);

//   const quillRef = useRef(null);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const quillInstance = new Quill(editorRef.current, {
//       theme: "snow", // Specify theme here
//       readOnly: readOnly,
//       modules: {
       
//         toolbar: [
//           [{ header: [1, 2, 3, 4, 5, 6, false] }],
//           [{ font: [] }],
//           [{ size: ["small", false, "large", "huge"] }],
//           [{ color: [] }, { background: [] }],
//           ["bold", "italic", "underline", "strike"],
//           [{ script: "sub" }, { script: "super" }],
//           [{ list: "ordered" }, { list: "bullet" }],
//           [{ indent: "-1" }, { indent: "+1" }],
//           [{ direction: "rtl" }],
//           [{ align: [] }],
//           ["link", "image", "video"],
//           ["clean"], // Remove formatting button
//         ],
//         imageResize: {
//             displaySize: true
//         }, // Enable image resize module
//       },
//     });

//     quillInstance.on("selection-change", (range) => {
//       setRange(range);
//     });

//     quillInstance.on("text-change", (delta) => {
//       setLastChange(delta);
//     });

//     quillRef.current = quillInstance;

//     return () => {
//       quillInstance.off("selection-change");
//       quillInstance.off("text-change");
//     };
//   }, [readOnly]);

//   useEffect(() => {
//     if (quillRef.current) {
//       quillRef.current.enable(!readOnly);
//     }
//   }, [readOnly]);

//   return (
//     <div>
//       <div ref={editorRef} style={{ height: "auto", my: 2 }}></div>
//     </div>
//   );
// };

// export default TextEditor;




import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const Editor = ({ placeholder,setValue, value, id, ...props }) => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html) => {
    setEditorHtml(html);
    setValue(html);
    console.log(html);
  };

  return (
    <ReactQuill
      theme="snow"
      onChange={handleChange}
      //value={editorHtml}
      value={value}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={"#root"}
      placeholder={placeholder}
      props
      id={id}
    />
  );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
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
  "video",
];

export default Editor;

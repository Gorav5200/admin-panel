import React from "react";

function PreviewCommon({ children }) {
  return (
    <>
      <h5 className="text-primary text-base font-bold font-inder p-2">
        Preview
      </h5>
      <div className="h-[94%] bg-white rounded-md overflow-scroll text-justify p-2 scrollbar-hide">
        {children}
      </div>
    </>
  );
}

export default PreviewCommon;

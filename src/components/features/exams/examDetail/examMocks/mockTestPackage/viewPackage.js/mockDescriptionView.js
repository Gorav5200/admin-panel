import React from "react";
import { useSelector } from "react-redux";
import { HTMLConverter } from "../../../../../../../services/common";

function MockDescriptionView() {
  const {viewMockDetails}=useSelector((state)=>state.mockPackage)
  return (
    <div className="my-2 p-2">
      <h5 className="font-bold  text-base">
       {viewMockDetails.title}
      </h5>
      <p className="text-secondary  text-sm pt-3  text-justify">
      
      <HTMLConverter>{viewMockDetails.description}</HTMLConverter> 
      </p>
    </div>
  );
}

export default MockDescriptionView;

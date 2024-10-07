import React from "react";
import { useSelector } from "react-redux";
import { HTMLConverter, dateFormatting } from "../../../../../../../services/common";

function MockDetailView() {
  const {viewMockDetails}=useSelector((state)=>state.mockPackage)
  return (
    <div className="my-5">
      <img
        src={viewMockDetails.img || "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="}
        width={343}
        height={200}
      ></img>
      <div className="text-sm font-inter p-3">
        <ul className="leading-9 mt-3">
          {[
            { heading: "Name", value:viewMockDetails?.title },
            {
              heading: "Price",
              value: viewMockDetails?.price || "null",
            },
            { heading: "Start Date", value: dateFormatting(viewMockDetails?.startDate).date || "null" },
            { heading: "Expiry Date", value: dateFormatting(viewMockDetails?.expiryDate).date|| "null" },
            {
              heading: "Package Highlights",
              value:viewMockDetails?.highlights || "null",
            },
          ].map((item) => (
            <li className="flex">
              <h6 className="basis-1/4 text-[#455564] ">{item.heading}:</h6>
              {Array.isArray(item.value) ? (
                <ul className="list-disc font-bold pl-3">
                  {item.value.map((itemValue, index) => (
                    <li key={index}><HTMLConverter>{itemValue} </HTMLConverter> </li>
                  ))}
                </ul>
              ) : (
                <h6 className="font-bold">{item.value}</h6>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MockDetailView;

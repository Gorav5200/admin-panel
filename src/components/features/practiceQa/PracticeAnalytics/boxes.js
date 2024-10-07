import React from "react";

const Boxes = (props) => {
  return (
    <div className="w-40 p-4 m-4 border rounded-md cursor-pointer hover:border-sky-500 border-r-emerald-100">
      <h2>{props.age} yrs</h2>
      <p>{props.age} users</p>
    </div>
  );
};

export default Boxes;

import React from "react";
import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="flex flex-row h-screen">
      <div className="basis-3/4 m-auto h-full">
        <Outlet />
      </div>
      <div className="basis-3/5 flex justify-center items-center bg-[#336792] h-full">
        <img
          src="/backgroundImages/bg-study.png"
          alt="background"
          className=""
        />
      </div>
    </div>
  );
}

export default Auth;

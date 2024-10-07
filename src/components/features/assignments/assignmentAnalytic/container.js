import React from "react";
import Rtrends from "./rtrends";
import Strends from "./strends";
import Guser from "./guser";
import Tuser from "./tuser";
import Uengagement from "./uengagement";
import Uparticipation from "./uparticipation";
import UserNavbar from "./userNavbar";
import Analytics from "./analytics";
import Years from "./years";

const Container = () => {
  return (
    <>
      <div className=" flex space-x-7 m-6" style={{ width: "1330px" }}>
        <Rtrends />
        <Strends />
      </div>
      <div className=" flex space-x-7 m-6" style={{ width: "1350px" }}>
        <Guser />
        <Tuser />
      </div>
      <div className=" flex space-x-7 m-6" style={{ width: "1340px" }}>
        <Uparticipation />
        <Uengagement />
      </div>
      <div className="p-1 , m-3 rounded-md border border-r-emerald-50">
        <UserNavbar />
        <Analytics />
      </div>
      <div
        className="p-1 m-3 rounded-md border border-#ebeded-50"
        style={{ height: "590px" }}
      >
        <Years />
      </div>
    </>
  );
};

export default Container;

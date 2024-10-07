import React from "react";
import { FadeLoader } from "react-spinners";


export function FadeLoaderComp() {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <FadeLoader color="#666a69" />
    </div>
  );
}

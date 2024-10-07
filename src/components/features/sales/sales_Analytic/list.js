import React from "react";
import Header from "../../../common/header";

import CollapsibleTable from "./collapsibleTable";

function List({ entityList }) {
  return (
    <div className="h-screen">
      <Header content={"Overview"} />
      <div className="bg-white p-3 m-2 rounded-md  ">
        <CollapsibleTable examList={entityList} />
      </div>
    </div>
  );
}

export default List;

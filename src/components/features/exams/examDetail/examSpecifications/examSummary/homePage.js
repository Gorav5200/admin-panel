import React from "react";
import FullWidthTabs from "../../common/tabChanger";
import Header from "../../common/header";
import Summary from "./summary";

function HomePage() {
  return (
    <div className=" overflow-hidden">
      <Header content={"Sales"} />
      <div className="bg-mdGrey h-[93%] p-3">
        <div className="bg-white  ">
          <FullWidthTabs
            data={[
              {
                item: 1,
                label: "Summary Analytics ",
                content: <Summary />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

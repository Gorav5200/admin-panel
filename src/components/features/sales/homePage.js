import React from "react";
import FullWidthTabs from "../../common/tabChanger";
import Header from "../../common/header";
import Promotion from "./promotion";
import AnalyticMain from "./sales_Analytic/analyticMain";

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
                label: "Sales Analytics ",
                content: <AnalyticMain />,
              },
              {
                item: 2,
                label: "Help Request  (08)",
                content: <Promotion />,
              },
              {
                item: 3,
                label: "Promotion",
                content: <Promotion />,
              },
              {
                item: 4,
                label: "HomePage Banner ",
                content: <Promotion />,
              },
              {
                item: 5,
                label: "Push Notification",
                content: <Promotion />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

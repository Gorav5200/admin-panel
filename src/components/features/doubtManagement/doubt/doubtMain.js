import React from "react";
import FullWidthTabs from "../../../common/tabChanger";
import AnalyticMain from "./doubtsAnalytics/analyticMain";
import DoubtList from "./doubtList";
import DoubtSolve from "./doubtSolve";
import NewDoubts from "./newDoubts";
import ReviewDoubt from "./reviewDoubt";

function Doubt() {


  return (
    <FullWidthTabs
      data={[
        {
          item: 1,
          label: "Doubts Analytics",
          content: <AnalyticMain />,
        },
        {
          item: 1,
          label: "New Doubts (4)", //doubt request
          content: <NewDoubts />,
        },
        {
          item: 2,
          label: "Ongoing Doubts (14) ", //Doubts Raised
          content: <DoubtList />,
        },

        {
          item: 3,
          label: "Solved Doubts (23)",
          content: <DoubtSolve />,
        },
        {
          item: 4,
          label: "Review Doubts",
          content: <ReviewDoubt />,
        },
      ]}
    />
  );
}

export default Doubt;






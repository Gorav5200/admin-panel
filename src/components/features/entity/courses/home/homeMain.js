import React from "react";
import Header from "../../../../common/header";
import { useParams } from "react-router-dom";
import FullWidthTabs from "../../../../common/tabChanger";
import Courses from "./courses";
import { useSelector } from "react-redux";
import { Analytics } from "@mui/icons-material";
import AnalyticsMain from "../analytics/analyticsMain";

function HomeMain() {
  const params = useParams();
  const { entity } = useSelector((state) => state.entity);

  return (
    <div>
      <Header
        content={`${
          entity?.find((item) => item._id === params.entityId)?.title
        } Courses`}
      />
      <div className="  m-2 rounded-md ">
        <FullWidthTabs
          data={[
            {
              item: 1,
              label: "Courses Analytics ",
              content: <AnalyticsMain />,
            },
            {
              item: 2,
              label: "Courses",
              content: <Courses />,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default HomeMain;

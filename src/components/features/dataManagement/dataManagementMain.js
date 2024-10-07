import React from "react";
import FullWidthTabs from "../../common/tabChanger";
import Subject from "./subject/subject";
import Topic from "./topic/topic";
import SubTopic from "./subTopic/subTopic";
import Entity from "./entity/entity";
import EntityType from "./entityType/entityType";
import Instruction from "./instruction/instruction";
import Percentile from "./percentile/percentile";
import Tcondition from "./tcondition/tcondition";

const DataManagementMain = () => {
  return (
    <div>
      <FullWidthTabs
        data={[
          {
            item: 1,
            label: "Entity",
            content: <Entity />,
          },
          {
            item: 2,
            label: "Entity Type",
            content: <EntityType />,
            path: "/main/data/entityType",
          },
          {
            item: 1,
            label: "Subject",
            content: <Subject />,
            path: "/main/data/subject",
          },
          {
            item: 2,
            label: "Topic",
            content: <Topic />,
            path: "/main/data/topic",
          },
          {
            item: 3,
            label: "Subtopic",
            content: <SubTopic />,
            path: "/main/data/subtopic",
          },

          {
            item: 4,
            label: "Instruction",
            content: <Instruction />,
            path: "/main/data/instruction",
          },

          {
            item: 5,
            label: "Percentile",
            content: <Percentile />,
            path: "/main/data/percentile",
          },
          {
            item: 6,
            label: "Terms & Conditions",
            content: <Tcondition />,
            path: "/main/data/tcondition",
          },
        ]}
        value={0}
      />
    </div>
  );
};

export default DataManagementMain;

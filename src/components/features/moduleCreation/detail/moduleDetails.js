import React from "react";
import { Descriptions } from "antd";

const ModuleDetails = ({ data, isLoading }) => {
  console.log("🚀 ~ ModuleDetails ~ data:", data);

  const items = [
    {
      key: "1",
      label: "Title",
      children: data?.title,
    },

    {
      key: "2",
      label: "Entity",
      children: data?.entity?.title,
    },
    {
      key: "3",
      label: "Entity Type",
      children: data?.entityType?.title,
    },
    {
      key: "4",
      label: "Subjects",
      children: <span className="mx-1">{data?.subject?.title}</span>,
      span: 1,
    },
    {
      key: "5",
      label: "Description",
      children: data?.description,
      span: 2,
    },
  ];

  return (
    <>
      {!isLoading && (
        <div className="info bg-white rounded-md overflow-scroll scrollbar-hide h-[90vh] p-2">
          <div>
            <Descriptions
              layout="vertical"
              contentStyle={{
                color: "#636262",
                fontFamily: "var(--font-inter)",
              }}
              labelStyle={{
                fontFamily: "var(--font-inter)",
                color: "var(--dark-blue)",
              }}
              bordered
              items={!isLoading && items}
            />
          </div>
        
        </div>
      )}
    </>
  );
};

export default ModuleDetails;

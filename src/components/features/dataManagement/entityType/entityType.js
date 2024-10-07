// question bank sample
import React, { useEffect, useState } from "react";
import EntityList from "./entityTypeList";
import { Button } from "@mui/material";
import useCustomRouter from "../../../../services/utilities/customRouter";
import Header from "../../../common/header";
import { useSelector } from "react-redux";
import { useGetEntityTypeListQuery } from "../../../../services/apis/dataManagement/entityType";
import { entityTypeApi } from "../../../../services/Constant";
import { FadeLoader } from "react-spinners";
import { SkeletonTableRows } from "../../../common/skeloton";
import CreateEntityType from "./createEntityType";
function EntityType() {
  const { navigate } = useCustomRouter();
  const [open, setOpen] = useState(false);
  const [compType, setCompType] = useState(null);
  const [data, setData] = useState({});

  const {
    data: entityTypeList,
    isLoading,
    isError,
    refetch,
  } = useGetEntityTypeListQuery(entityTypeApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("17", entityTypeList);

  const columns = [
    { dataKey: "_id", label: "Entity ID", minWidth: 170 },
    {
      dataKey: "title",
      label: "Title",
      align: "left",
    },

    {
      dataKey: "description",
      label: "Description",
      align: "left",
      type: "truncate",
      maxWidth: 300,
    },
    // { dataKey: "subjects", label: "Subjects", align: "left" },
    {
      dataKey: "isPublished",
      label: "Status",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
  ];

  return (
    <div className="h-screen">
      <Header content={"Manage Entity Type"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <EntityList
            data={entityTypeList?.data || []}
            placeholder="Search by Entity, Subjects"
            comp={
              <Button
                variant="contained"
                onClick={() => {
                  setCompType("create");
                  setData({ title: null, business_subcategory_id: null });
                  setOpen(true);
                }}
                sx={{
                  backgroundColor: "var(--primary)",
                  width: 178,
                  height: 46,
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  borderRadius: 2,
                  textTransform: "none",
                  ml: 1,
                  ":hover": {
                    backgroundColor: "var(--primary)",
                  },
                }}
              >
                +   Create Entity Type
              </Button>
            }
            editFun={(val) => {
              setCompType("edit");
              setData(val);
              setOpen(true);
            }}
            columns={columns}
            path={"/main/data/entity"}
            loading={isLoading}
          />
        }
        <CreateEntityType
          refetch={refetch}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          compType={compType}
          data={data}
        />
      </div>
    </div>
  );
}

export default EntityType;

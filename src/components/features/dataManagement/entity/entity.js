// question bank sample
import React, { useState } from "react";
import EntityList from "./entityList";
import { Button } from "@mui/material";
import useCustomRouter from "../../../../services/utilities/customRouter";
import Header from "../../../common/header";
import { useGetEntityListQuery } from "../../../../services/apis/dataManagement/entity";
import { entityApi } from "../../../../services/Constant";
import CreateEntity from "./createEntity";


function Entity() {
  const [open, setOpen] = useState(false);
  const [compType, setCompType] = useState(null);
  const [data, setData] = useState({});
  const {
    data: entityList,
    isLoading,
    isError,
    refetch,
  } = useGetEntityListQuery(entityApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("17", entityList);

  const columns = [
    
    { dataKey: "_id", label: "Entity ID", minWidth: 170 },

    // { dataKey: "subjects", label: "Subjects", align: "left" },
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
    {
      dataKey: "isPublished",
      label: "Status",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
  ]; //HEaders for table

  return (
    <div className="h-screen">
      <Header content={"Manage Entity"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <EntityList
            data={entityList?.data || []}
            placeholder="Search by Entity, Subjects"
            comp={
              <Button
                variant="contained"
                onClick={() => {
                  setCompType("create");
                  setData({
                    title: null,
                    category_id: null,
                 
                  });
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

                  ":hover": {
                    backgroundColor: "var(--primary)",
                  },
                }}
              >
               + Create Entity
              </Button>
            }
            editFun={(val) => {
              setCompType("edit");
              setData({
                title: val.title,
                category_id: val.category_id,
                _id: val._id,
                thumbnail:val.thumbnail,
              });
              setOpen(true);
            }}
            compType={"create"}
            columns={columns}
            path={"/main/data/entity"}
            loading={isLoading}
          />
        }
        <CreateEntity
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

export default Entity;

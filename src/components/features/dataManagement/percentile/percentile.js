import React, { useEffect, useState } from "react";
import PercentileList from "./percentileList";
import { Button } from "@mui/material";
import useCustomRouter from "../../../../services/utilities/customRouter";
import Header from "../../../common/header";
import { useSelector } from "react-redux";
import { useGetPercentileListQuery } from "../../../../services/apis/dataManagement/percentile";
import { percentileApi } from "../../../../services/Constant";
import { FadeLoader } from "react-spinners";
import { SkeletonTableRows } from "../../../common/skeloton";
import CreatePercentile from "./createPercentile";

function Percentile() {
  const { navigate } = useCustomRouter();
  const [open, setOpen] = useState(false);
  const [compType, setCompType] = useState(null);
  const [data, setData] = useState({});

  const {
    data: percentileList,
    isLoading,
    isError,
    refetch,
  } = useGetPercentileListQuery(percentileApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("17", percentileList);

  const columns = [
    {
      dataKey: "_id",
      label: "Id",
      align: "left",
    },

    {
      dataKey: "title",
      label: "Title",
      align: "left",
    },
    // {
    //   dataKey: "File detail",
    //   label: "File Detail",
    //   align: "left",
    // },
  ];

  return (
    <div className="h-screen">
      <Header content={"Manage Percentile"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <PercentileList
            data={percentileList?.data || []}
            placeholder="Search by Entity, Subjects"
            comp={
              <Button
                variant="contained"
                type="file"
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
                + Create Percentile
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
        <CreatePercentile
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

export default Percentile;

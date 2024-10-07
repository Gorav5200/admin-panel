// question bank sample
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import useCustomRouter from "../../../../services/utilities/customRouter";
import Header from "../../../common/header";
import { useSelector } from "react-redux";
import { useGetTermsListQuery } from "../../../../services/apis/dataManagement/terms";
import { termsApi } from "../../../../services/Constant";
import { FadeLoader } from "react-spinners";
import { SkeletonTableRows } from "../../../common/skeloton";
import CreateTcondition from "./createTcondition";
import TconditionList from "./tconditionList";

function Tcondition() {
  const { navigate } = useCustomRouter();
  const [open, setOpen] = useState(false);
  const [compType, setCompType] = useState(null);
  const [data, setData] = useState({});

  const {
    data: TconditionListData,
    isLoading,
    isError,
    refetch,
  } = useGetTermsListQuery(termsApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("29", TconditionListData);

  const columns = [
    {
      dataKey: "name",
      label: "Name",
      align: "left",
    },
    {
      dataKey: "title",
      label: "Title",
      align: "left",
    },
    {
      dataKey: "termsAndCondition",
      label: "TermsAndCondition",
      align: "left",
    },
    {
      dataKey: "isPublished",
      label: "Status",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
  ];

  return (
    <div className="h-screen">
      <Header content={"Manage Terms & Conditions"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <TconditionList
            data={TconditionListData?.data || []}
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
                + Create Term & Condition
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
        <CreateTcondition
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

export default Tcondition;

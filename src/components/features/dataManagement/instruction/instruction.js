// question bank sample
import React, { useEffect, useState } from "react";
import InstructionList from "./instructionList";
import { Button } from "@mui/material";
import useCustomRouter from "../../../../services/utilities/customRouter";
import Header from "../../../common/header";
import { useSelector } from "react-redux";
import { useGetInstructionsListQuery } from "../../../../services/apis/dataManagement/instructions";
import { instructionsApi } from "../../../../services/Constant";
import { FadeLoader } from "react-spinners";
import { SkeletonTableRows } from "../../../common/skeloton";
// import CreateInstruction from "./createInstruction";
import CreateInstruction from "./createInstruction";
function Instruction() {
  const { navigate } = useCustomRouter();
  const [open, setOpen] = useState(false);
  const [compType, setCompType] = useState(null);
  const [data, setData] = useState({});

  const {
    data: instructionList,
    isLoading,
    isError,
    refetch,
  } = useGetInstructionsListQuery(instructionsApi.endPoint, {
    refetchOnMountOrArgChange: true,
  });

  console.log("29", instructionList);

  const columns = [
    // { dataKey: "_id", label: "Entity ID", minWidth: 170 },

    // { dataKey: "subjects", label: "Subjects", align: "left" },
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
      dataKey: "instructions",
      label: "Instruction",
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
      <Header content={"Manage Instruction"} />
      <div className="bg-white p-3 m-2 rounded-md ">
        {
          <InstructionList
            data={instructionList?.data || []}
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
                + Create Instruction
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
        <CreateInstruction
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

export default Instruction;

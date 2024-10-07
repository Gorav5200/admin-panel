import React, { useState } from "react";
import NestedTable from "../../../../common/nestedTable";
import {
  assignmentHeader,
  packageHeader,
} from "../../../../../services/constHeaders";
import { useGetAssignmentPackageQuery } from "../../../../../services/apis/assignmentApi";
import { assignmentApi } from "../../../../../services/Constant";
import { AppBar, Container, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveView, setAssignments } from "../../../../../ducks/addModuleSlice";
import { CustomButton,CustomButtonStyle } from "../../../../../styles/muiRoot";

function Assignments() {
  const { data, isLoading, isSuccess ,isFetching} = useGetAssignmentPackageQuery(
    `${assignmentApi.endPoint}/package/list`
  );

  const dispatch = useDispatch();
  const state = useSelector((state) => state.addModule);

  return (
    <div>
      <AppBar
        position="static"
        color="secondary"
        sx={{ boxShadow: "none", borderRadius: 1, mb: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <h5 className="font-inter text-xl font-semibold">
              Add Assignments
            </h5>
          </Toolbar>
        </Container>
      </AppBar>

      <NestedTable
        upperHeader={packageHeader}
        nestedHeader={assignmentHeader}
        nestedTitle={"Select Assignments"}
        data={data?.data.packageList || []}
        loading={isLoading || isFetching}
        setValue={(val) => dispatch(setAssignments(val))}
        value={state.assignments}
      />
       <CustomButton
          style={{
            ...CustomButtonStyle,
            width: 117,
            height: 39,
          position:'absolute',
          right:15,
          bottom:20,
           
            borderRadius: 6,
          }}
          onClick={()=>dispatch(setActiveView(("pastPapers")))}
        >
          Save & continue
        </CustomButton>
    </div>
  );
}

export default Assignments;

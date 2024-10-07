import React, { useState } from "react";
import NestedTable from "../../../../common/nestedTable";
import {
  dailyQuizHeader,
  packageHeader,
} from "../../../../../services/constHeaders";
import { pastPaperApi, practiceQaApi } from "../../../../../services/Constant";
import { AppBar, Container, Toolbar } from "@mui/material";
import { useGetPracticeQaPackageQuery } from "../../../../../services/apis/practiceQaApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveView,
  setPracticeQa,
} from "../../../../../ducks/addModuleSlice";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";

function PracticeQa() {
  const {
    data: packageData,
    isLoading,
    isError: packageError,
    isFetching
  } = useGetPracticeQaPackageQuery(`${practiceQaApi.endPoint}/package/list`, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => state.addModule);

  console.log("🚀 ~ past paper ~ data:", packageData);

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
              Add Practice-QA
            </h5>
          </Toolbar>
        </Container>
      </AppBar>

      <NestedTable
        upperHeader={packageHeader}
        nestedHeader={dailyQuizHeader}
        nestedTitle={"Select Practice QA"}
        data={packageData?.data.packageList || []}
        loading={isLoading || isFetching}
        setValue={(val) => dispatch(setPracticeQa(val))}
        value={state.practiceQa}
      />

      <CustomButton
        style={{
          ...CustomButtonStyle,
          width: 117,
          height: 39,
          position: "absolute",
          right: 15,
          bottom: 20,

          borderRadius: 6,
        }}
        onClick={() => dispatch(setActiveView("learn"))}
      >
        Save & continue
      </CustomButton>
    </div>
  );
}

export default PracticeQa;

import React, { useState } from "react";
import NestedTable from "../../../../common/nestedTable";
import {
  dailyQuizHeader,
  packageHeader,
} from "../../../../../services/constHeaders";
import { pastPaperApi } from "../../../../../services/Constant";
import { AppBar, Container, Toolbar } from "@mui/material";
import { useGetPastPaperPackageQuery } from "../../../../../services/apis/pastPapersApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setActiveView, setPastPapers } from "../../../../../ducks/addModuleSlice";
import { CustomButton ,CustomButtonStyle} from "../../../../../styles/muiRoot";

function PastPapers() {
  const {
    data: packageData,
    isLoading,
    isError: packageError,
    isFetching
  } = useGetPastPaperPackageQuery(`${pastPaperApi.endPoint}/package/list`, {
    refetchOnMountOrArgChange: true,
  });

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
              Add Past-Papers
            </h5>
          </Toolbar>
        </Container>
      </AppBar>

      <NestedTable
        upperHeader={packageHeader}
        nestedHeader={dailyQuizHeader}
        nestedTitle={"Select Past Papers"}
        data={packageData?.data.packageList || []}
        loading={isLoading || isFetching}
        setValue={(val) =>dispatch(setPastPapers(val))}
        value={state.pastPapers}
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
          onClick={()=>dispatch(setActiveView(("practiceQa")))}
        >
          Save & continue
        </CustomButton>
    </div>
  );
}

export default PastPapers;

import React, { useState } from "react";
import NestedTable from "../../../../common/nestedTable";
import {
  learnHeader,
  packageHeader,
} from "../../../../../services/constHeaders";
import { useGetDailyQuizPackageQuery } from "../../../../../services/apis/dailyQuizApi";
import { learnApi } from "../../../../../services/Constant";
import { AppBar, Container, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveView, setLearn } from "../../../../../ducks/addModuleSlice";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import PublishModal from "./publishModal";


function Learn() {
  const {
    data: packageData,
    isLoading,
    isError: packageError,
    isFetching
  } = useGetDailyQuizPackageQuery(`${learnApi.endPoint}/package/list`, {
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.addModule);

  console.log("🚀 ~ Learn ~ packageData:", packageData);

  return (
    <div>
      <AppBar
        position="static"
        color="secondary"
        sx={{ boxShadow: "none", borderRadius: 1, mb: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <h5 className="font-inter text-xl font-semibold">Add Learn</h5>
          </Toolbar>
        </Container>
      </AppBar>

      <NestedTable
        upperHeader={packageHeader}
        nestedHeader={learnHeader}
        nestedTitle={"Select Learn"}
        data={packageData?.data.packageList || []}
        loading={isLoading || isFetching}
        setValue={(val) => dispatch(setLearn(val))}
        value={state.learn}
      />
      <PublishModal handleClose={() => setOpen(false)} open={open} />
      <CustomButton
        disabled={isLoading || isFetching}
        style={{
          ...CustomButtonStyle,
          width: 117,
          height: 39,
          position: "absolute",
          right: 15,
          bottom: 20,

          borderRadius: 6,
        }}
        onClick={()=>dispatch(setActiveView("dailyQuiz"))}
      >
        Save & continue
      </CustomButton>
    </div>
  );
}

export default Learn;

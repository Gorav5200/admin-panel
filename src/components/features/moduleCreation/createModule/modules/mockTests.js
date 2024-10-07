import React, { useMemo, useState ,useRef} from "react";
import NestedTable from "../../../../common/nestedTable";
import {
  mockTestHeader,
  packageHeader,
} from "../../../../../services/constHeaders";
import { mockPackageApi } from "../../../../../services/Constant";
import { AppBar, Container, Toolbar } from "@mui/material";
import { useGetMockPackagesQuery } from "../../../../../services/apis/exam/mock";
import {
  setActiveView,
  setMockTests,
} from "../../../../../ducks/addModuleSlice";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { useDispatch, useSelector } from "react-redux";

function MockTests() {
  const {
    data: packageData,
    isLoading,
    isError: packageError,
    isFetching
  } = useGetMockPackagesQuery(`${mockPackageApi.endPoint}`, {
    refetchOnMountOrArgChange: true,
  });
  console.log("🚀 ~ MockTests ~ packageData:", packageData);


 

  const data = useMemo(() => {
    const modifiedData = (packageData?.data || []).map((e) => {
      const { mocklist, ...rest } = e;
      delete rest.mocklist;
      return { ...rest, list: mocklist };
    });

    return modifiedData || [];
  }, [packageData]);
  console.log("🚀 ~ data ~ data:", data);

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
            <h5 className="font-inter text-xl font-semibold">Add Mock-Tests</h5>
          </Toolbar>
        </Container>
      </AppBar>

      <NestedTable
        upperHeader={packageHeader}
        nestedHeader={mockTestHeader}
        nestedTitle={"Select Mock-Tests"}
        data={data}
        valueTransform={true}
        loading={isLoading || isFetching}
        setValue={(val) => dispatch(setMockTests(val))}
        value={state.mockPackages}
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
        onClick={() => dispatch(setActiveView("assignments"))}
      >
        Save & continue
      </CustomButton>
    </div>
  );
}

export default MockTests;

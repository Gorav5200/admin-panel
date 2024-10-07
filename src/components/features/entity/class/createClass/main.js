import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import ClassContext from "./createContext";
import ClassDetails from "./createDetails";
import "react-toastify/dist/ReactToastify.css";
import { HeaderWithNavigation } from "../../../../common/header";
import { setActiveStep } from "../../../../../ducks/exams/classSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const steps = ["Class Details", "Class Context"];

const CreateMain = () => {
  const { activeStep } = useSelector((state) => state.class);
  const location = useLocation();
  const dispatch = useDispatch();
  
  return (
    <div>
      <HeaderWithNavigation cont={location.pathname.includes("edit") ?"Edit Class":"Create Class"} />
      <div className="p-2">
        <Box>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ backgroundColor: "white", padding: 3, borderRadius: 2 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box>
            {activeStep === steps.length ? (
              <Box>
                <p>All steps completed</p>
              </Box>
            ) : (
              <Box>
                {activeStep === 0 && (
                  <Box>
                    <ClassDetails
                      handleStep={(val) => dispatch(setActiveStep(val))}
                    />

                    <br />
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <ClassContext />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default CreateMain;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import LearnContext from "./learnContext";
import "react-toastify/dist/ReactToastify.css";
import { HeaderWithNavigation } from "../../../common/header";
import LearnDetails from "./learnDetails";

const CreateMain = () => {
  const steps = ["Learn Details", "Learn Context"];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <HeaderWithNavigation cont={"Create Learn Topics"} />

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
                    <LearnDetails handleStep={(val) => setActiveStep(val)} />

                    <br />
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <LearnContext />
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

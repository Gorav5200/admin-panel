import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { HeaderWithNavigation } from "../../../../../common/header";
import CreateDetail from "./createDetail";
import QuizContext from "./quizContext";


const CreateMain = () => {
  const steps = ["Mock Details", "Mock Context"];
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <div>
      <HeaderWithNavigation cont={"Create Mock"} />
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
                    <CreateDetail
                    handleStep={(val) => setActiveStep(val)}
                    />
                    <br />
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <QuizContext/>
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

import React, { useMemo, useState } from "react";
import { Divider } from "@mui/material";
import { HeaderWithNavigation } from "../../../common/header";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ImportQuestion from "./importQuestion";
import CreateDetail from "./createDetail";
import { useLocation, useParams } from "react-router-dom";

const CreateMain = () => {
  const [activeStep, setActiveStep] = useState(0);
  const params = useParams();
  const location = useLocation();

  const checkCompType = useMemo(() => {
    if (
      location?.pathname === `/main/exam/practiceQa/edit/${params.practiceId}`
    ) {
      return { type: "edit" };
    } else {
      return { type: "create" };
    }
  }, [location.pathname]);

  console.log("🚀 ~ checkCompType ~ checkCompType:", checkCompType);

  console.log("🚀 ~ MainCreate ~ location:", location);
  console.log("🚀 ~ MainCreate ~ params:", params);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep < steps.length - 1) {
        return prevActiveStep + 1;
      }
      return prevActiveStep;
    });
  };

  const steps = [
    {
      label: "Add Details",
      component: (
        <CreateDetail handleNext={handleNext} compType={checkCompType.type} />
      ),
    },
    {
      label: "Import Question",
      component: (
        <ImportQuestion handleNext={handleNext} compType={checkCompType.type} />
      ),
    },
  ];

  return (
    <>
      <HeaderWithNavigation
        cont={
          checkCompType.type === `edit`
            ? "Edit Practice Q/A"
            : "Create Practice Q/A"
        }
      />
      <div className="bg-white rounded-md w-full p-2">
        <Box sx={{ width: "100%", my: 1 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step
                key={step.label}
                onClick={() => setActiveStep(index)}
                sx={{ cursor: "pointer" }}
              >
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Divider />

        <div>{steps[activeStep]?.component}</div>
      </div>
    </>
  );
};
export default CreateMain;

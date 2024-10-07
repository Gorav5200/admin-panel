import React, { useState } from "react";
import { HeaderWithNavigation } from "../../../../common/header";
import { Link, useParams } from "react-router-dom";
import { FileEdit, MoreVertical, MoreVerticalIcon, Option } from "lucide-react";
import { Box, Stack } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import PreviewForm from "./previewForm";
import { useSelector } from "react-redux";
import { Stepper, Step, StepLabel } from "@mui/material";

function Preview() {
  const { pastPaperDetail } = useSelector((state) => state.pastPapers);
  const steps = ["Questions", "Publish Topic"];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="h-screen bg-medGrey">
      <div className="header">
        <HeaderWithNavigation cont="Algebra" />
        <Stack direction={"row"} bgcolor={"var(--med-grey)"} pb={1}>
          <p className="text-xs text-secondary pl-14 flex">
            {pastPaperDetail?.sections.map(({ title }) => (
              <>
                {title} <span className="mx-1">|</span>
              </>
            ))}
            26 Sep’21 | 02:00 P.M. | ₹{pastPaperDetail?.price}{" "}
          </p>
          <Link
            to={`/main/exam/pastPapers/mocks/edit`}
            className="text-[#336792] flex text-xs ml-1"
          >
            <FileEdit size={13} />
            Edit
          </Link>
        </Stack>
      </div>

      <div className="p-2">
        <Box>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ backgroundColor: "white", padding: 3, borderRadius: 2 }}
          >
            {steps.map((label, ind) => (
              <Step key={label} sx={{ textAlign: "start" }}>
                <StepLabel>
                  {label}
                  <br />
                  <span className="text-xs text-gray-500">
                    {ind === 0
                      ? "Create / Import Questions"
                      : ind === 1
                      ? "Are you want to publish"
                      : null}
                  </span>
                </StepLabel>
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
                  <Box sx={{ mt: 2 }}>
                    <PreviewForm />
                  </Box>
                )}
                {activeStep === 1 && <Box></Box>}
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Preview;

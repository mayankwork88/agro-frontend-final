import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Stack } from "@mui/material";
import useAddSiteContext from "../hooks/Admin/useAddSiteContext";

export default function HorizontalNonLinearStepper({ steps }) {
  const [completed, setCompleted] = React.useState({});
  const {activeStep, setActiveStep} = useAddSiteContext()

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const getComp = () => steps?.find((ele, ind) => ind === activeStep);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack px={20}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map(({ label }, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton sx={{ cursor: "default" }}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Stack>

      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Divider sx={{ marginTop: 3 }} />
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step hello {activeStep + 1}
            </Typography> */}
            <Stack px={2}>
              {getComp()?.component}
              {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 3 }}> */}
                {/* <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, ml: 1 }}
                >
                  Back
                </Button> */}
                {/* <Box sx={{ flex: "1 1 auto" }} /> */}
                {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button> */}
                {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : ( */}
                {/* <Button
                  variant="contained"
                  sx={{ minWidth: "100px", mr: 2 }}
                  type="submit"
                  onClick={handleComplete}
                >
                  {completedSteps() === totalSteps() - 1 ||
                  completed[activeStep]
                    ? "Finish"
                    : "Next"}
                </Button> */}
                {/* ))} */}
              {/* </Box> */}
            </Stack>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

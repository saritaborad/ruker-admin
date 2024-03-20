import React, { useState } from "react";
import SignUpHeader from "./../Components/common/SignUpHeader";
import CreateAccount from "../Components/auth/CreateAccount";
import VerifyUserCode from "./../Components/auth/VerifyUserCode";
import UserProfile from "./../Components/auth/UserProfile";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  styled,
  Stack,
} from "@mui/material";
import { useAppSelector } from "./../store/hooks";
import colorConst from "./../Constants/ColorConstant";
import fontConst from "./../Constants/FontConstant";
import { selectStep } from "./../store/slices/adminSlice";
const SignUpPage = () => {
  const currentStep: any = useAppSelector(selectStep);

  const [activeStep, setActiveStep] = useState<any>(currentStep?.step || 0);
  const [user, setUser] = useState<any>("");
  const steps = ["Create new account", "Verify user", "Set up user profile"];

  const getStepContent = (step: any) => {
    switch (step) {
      case 0:
        return (
          <CreateAccount
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            user={user}
            setUser={setUser}
          />
        );
      case 1:
        return (
          <VerifyUserCode
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            user={user}
          />
        );
      case 2:
        return (
          <UserProfile
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            user={user}
            setUser={setUser}
          />
        );
      default:
        return (
          <CreateAccount
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            user={user}
            setUser={setUser}
          />
        );
    }
  };
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#18484f",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#18484f",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      // borderColor:
      //   theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  // useEffect(() => {
  //   // const storedStep = localStorage.getItem('activeStep');
  //   //   if (storedStep !== null) {
  //   //     setActiveStep(parseInt(storedStep, 10));
  //   if (currentStep !== null) {
  //     const storedStep = currentStep?.step;
  //     if (storedStep !== null) {
  //       setUser(currentStep?.email);
  //       setActiveStep(parseInt(storedStep, 10));
  //     }

  //   }

  // }, [searchParamsData]);
  // useEffect(() => {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     searchParams.set('step', activeStep + 1);
  //     const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  //     window.history.replaceState(null, '', newUrl);
  //   }, [activeStep]);

  return (
    <>
      <SignUpHeader />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: colorConst?.Orange,
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "grey.500",
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: colorConst?.Orange,
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: colorConst?.Orange,
                    },
                  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                    fill: "black",
                  },
                }}
              >
                <StepLabel>
                  {" "}
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: fontConst?.FONTSIZE_16,
                      fontWeight: fontConst?.FONTWEIGHT_500,
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Stack sx={{ margin: "5% auto" }}>{getStepContent(activeStep)}</Stack>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

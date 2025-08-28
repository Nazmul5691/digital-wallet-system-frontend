/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Joyride, { type Step, type CallBackProps, STATUS } from "react-joyride";
import { useNavigate, useLocation } from "react-router";

export default function UserGuidedTour() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const steps: (Step & { route?: string })[] = [
    { target: ".sidebar-nav", content: "This is your dashboard navigation menu.", route: "/user/dashboard" },
    { target: ".dashboard-cards", content: "Here is your dashboard. You can see your wallet balance and do some quick actions and also see some transactions.", route: "/user/dashboard" },
    { target: ".deposit-card", content: "This is your deposit card. Enter amount for deposit.", route: "/user/deposit" },
    { target: ".withdraw-card", content: "This is your withdraw card. Enter amount to withdraw.", route: "/user/withdraw" },
    { target: ".send-money-card", content: "This is your send money card. Search a user for send money.", route: "/user/send-money" },
    { target: ".transactions-table", content: "Here is your transaction history table. Here you can see your history and do filter by type.", route: "/user/transaction-history" },
    { target: ".profile-section", content: "Check or update your profile here.", route: "/user/profile" },
  ];

  // Start tour only once
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      startTourFromStep(0);
      localStorage.setItem("hasSeenTour", "true");
    }
  }, []);

  // Listen for restart event
  useEffect(() => {
    const handleRestart = () => {
      localStorage.removeItem("hasSeenTour");
      startTourFromStep(0);
    };

    window.addEventListener("restartTour", handleRestart);
    return () => window.removeEventListener("restartTour", handleRestart);
  }, [location.pathname]);

  const startTourFromStep = (index: number) => {
    const step = steps[index];
    if (step?.route && step.route !== location.pathname) {
      navigate(step.route, { replace: true });
      setTimeout(() => {
        setStepIndex(index);
        setRun(true);
      }, 200); // allow page to render
    } else {
      setStepIndex(index);
      setRun(true);
    }
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;

    // Stop tour on skip or finish
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      return;
    }

    if (type === "step:after") {
      const nextStep = steps[index + 1];

      if (!nextStep) {
        // Last step reached → stop tour
        setRun(false);
        return;
      }

      if (nextStep.route && nextStep.route !== location.pathname) {
        navigate(nextStep.route, { replace: true });
      }

      // Wait a bit for the next page to render
      setTimeout(() => setStepIndex(index + 1), 200);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: "#4F46E5",
          textColor: "#333",
          width: 300,
          arrowColor: "#4F46E5",
          zIndex: 10000,
        },
        tooltipContainer: {
          borderRadius: "8px",
          padding: "16px",
        },
      }}
    />
  );
}

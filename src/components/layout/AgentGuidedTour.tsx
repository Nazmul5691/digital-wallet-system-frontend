/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Joyride, { type Step, type CallBackProps, STATUS } from "react-joyride";
import { useNavigate, useLocation } from "react-router";

export default function AgentGuidedTour() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const steps: (Step & { route?: string })[] = [
    { target: ".sidebar-nav", content: "This is your dashboard navigation menu.", route: "/agent/overview" },
    { target: ".dashboard-cards", content: "Here is your dashboard. You can see your wallet balance and see some transactions.", route: "/agent/overview" },
    { target: ".cash-in", content: "This is your Cash-In (Add Money) card. Search a user for cash in.", route: "/agent/cash-in" },
    { target: ".cash-out", content: "This is your Cash-Out (Withdraw) card. Search a user for cash out.", route: "/agent/cash-out" },
    { target: ".transactions-table", content: "Here is your transaction history table. Here you can see your history and do filter by type.", route: "/agent/transactions" },
    { target: ".profile-section", content: "Check or update your profile here.", route: "/agent/profile" },
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

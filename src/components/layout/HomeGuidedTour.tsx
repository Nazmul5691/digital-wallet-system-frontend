


/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Joyride, { type Step, type CallBackProps, STATUS } from "react-joyride";

export default function HomeGuidedTour() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    { target: ".nav-items", content: "This is the navigation menu." },
    {
      target: ".theme-change-login",
      content:
        "Here you can change your app theme and click login to start exploring your dashboard!",
    },
    {
      target: ".banner-section",
      content:
        "Welcome to our homepage! Check out the highlights and latest updates here.",
    },
    {
      target: ".footer-section",
      content:
        "Here in the footer, you can find important links, contact info, and social media channels.",
    },
  ];

  // Check if all targets exist
  const areTargetsReady = () =>
  steps.every(step => {
    if (typeof step.target === "string") {
      return !!document.querySelector(step.target);
    }
    // If target is already an HTMLElement, consider it ready
    return step.target instanceof HTMLElement;
  });

  // Start tour
  const startTour = () => {
    const interval = setInterval(() => {
      if (areTargetsReady()) {
        setStepIndex(0);
        setRun(true);
        clearInterval(interval);
      }
    }, 100);
  };

  useEffect(() => {
    // First-time visitors or triggered via sessionStorage
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    const showTourFlag = sessionStorage.getItem("showTour");

    if (!hasSeenTour || showTourFlag === "true") {
      startTour();
      localStorage.setItem("hasSeenTour", "true");
      sessionStorage.removeItem("showTour");
    }

    // Listen for restartTour event
    const handleRestart = () => startTour();
    window.addEventListener("restartTour", handleRestart);
    return () => window.removeEventListener("restartTour", handleRestart);
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      return;
    }
    if (type === "step:after") setStepIndex(index + 1);
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


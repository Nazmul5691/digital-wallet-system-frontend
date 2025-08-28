/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Joyride, { type Step, type CallBackProps, STATUS } from "react-joyride";
import { useNavigate, useLocation } from "react-router";

export default function HomeGuidedTour() {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const steps: (Step & { route?: string })[] = [
    { target: ".nav-items", content: "This is navigation menu.", route: "/" },
    {
      target: ".theme-change-login",
      content:
        "Here you can change your app theme and click login to start exploring your dashboard!",
      route: "/",
    },
    {
      target: ".banner-section",
      content:
        "Welcome to our homepage! Check out the highlights and latest updates here.",
      route: "/",
    },
    {
      target: ".footer-section",
      content:
        "Here in the footer, you can find important links, contact info, and social media channels.",
      route: "/",
    },
  ];

  // Start tour only once on first visit
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
      // Navigate to homepage first
      navigate(step.route, { replace: true });
      setTimeout(() => {
        setStepIndex(index);
        setRun(true);
      }, 300); // give homepage time to render
    } else {
      setStepIndex(index);
      setRun(true);
    }
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      return;
    }

    if (type === "step:after") {
      const nextStep = steps[index + 1];

      if (!nextStep) {
        setRun(false); // stop on last step
        return;
      }

      if (nextStep.route && nextStep.route !== location.pathname) {
        navigate(nextStep.route, { replace: true });
      }

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

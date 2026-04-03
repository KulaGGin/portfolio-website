import { useEffect } from "react";
import { useNavigationType, useLocation } from "react-router-dom";
import { useNavigation } from "components/NavigationContext/NavigationContext";

const NavigationManager = () => {
  const { setDirection } = useNavigation();
  const location = useLocation();
  const navigationType = useNavigationType(); // PUSH, POP, REPLACE

  useEffect(() => {
    const handlePopState = () => {
      setDirection(-1);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setDirection]);

  return null; // nothing to render
};

export default NavigationManager;
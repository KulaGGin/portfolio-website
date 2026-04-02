import { useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { motion } from "framer-motion";
import { PageVariants, PageTransition } from "Animations/PageTransition";

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  const goingToProject = location.pathname.startsWith("/project");
  const comingFromProject = prevPath.current.startsWith("/project");

  let direction = 1;

  if (comingFromProject && location.pathname === "/") {
    direction = -1; // project → home (slide left)
  } else if (goingToProject) {
    direction = 1; // home → project (slide right)
  }

  // update previous path AFTER calculation
  prevPath.current = location.pathname;

  return (
    <motion.div
      custom={direction}
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={PageTransition}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        boxShadow: "0 0 40px rgba(0,0,0,0.2)"
    }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
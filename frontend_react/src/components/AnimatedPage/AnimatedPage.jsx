import { motion } from "framer-motion";
import { PageVariants, PageTransition } from "Animations/PageTransition";
import { useNavigation } from "components/NavigationContext/NavigationContext";
import {useLocation} from "react-router-dom";

const AnimatedPage = ({ children }) => {
  const {direction, setDirection} = useNavigation();
  console.log(`AnimatedPage mounted, Direction: ${direction}`);

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
      onAnimationComplete={() => {
        setDirection(1);
      }}
    >
      {children}
    </motion.div>
  );
};

export {AnimatedPage};
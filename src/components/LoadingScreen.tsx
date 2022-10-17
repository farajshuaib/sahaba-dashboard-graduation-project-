import React from "react";
import { motion } from "framer-motion";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const LoadingScreen: React.FC = () => {
  return (
    <div
      data-testid="loadingScreen"
      className="flex items-center justify-center h-screen text-center bg-white "
    >
      <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <iframe src="https://embed.lottiefiles.com/animation/85759"></iframe>
        <div className="absolute inset-0 z-50"></div>
        {/* <i className="text-6xl bx bx-loader-alt bx-spin "></i> */}
      </motion.div>
    </div>
  );
};

export default LoadingScreen;

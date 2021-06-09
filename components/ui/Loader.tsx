import React from "react";
import { motion } from "framer-motion";

const loader = {
  visible: {
    scale: [1.2, 1, 1.2],
    transition: {
      scale: {
        yoyo: Infinity,
        duration: 0.5,
      },
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      className="loader"
      variants={loader}
      animate="visible"
    ></motion.div>
  );
};

export default Loader;

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.2,
    },
  },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "100px",
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AnimateModal = ({ show, setShow, config }) => {
  const { title, subtitle, showButton } = config;

  if (!showButton) {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="modal"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="title">{title}</div>
            <div className="subtitle">{subtitle}</div>
            {showButton && (
              <div className="button" onClick={() => setShow(false)}>
                我知道了
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimateModal;

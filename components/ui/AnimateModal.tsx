import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../styles/CommonUi.module.scss";

const backdropAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
};

const modalAnimation = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "100px",
    opacity: 1,
    transition: {
      delay: 0.3,
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

  useEffect(() => {
    console.log("????");
    if (!showButton) {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  });

  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={styles.modal}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
        {showButton && (
          <div className={styles.button} onClick={() => setShow(false)}>
            我知道了
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnimateModal;

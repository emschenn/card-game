import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/CommonUi.module.scss";

interface IProps {
  onOkClick: (e) => void;
  text: string;
}

const OkButton = ({ onOkClick, text }: IProps) => {
  return (
    <motion.div
      className={styles.okButton}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onOkClick}
    >
      {text}
    </motion.div>
  );
};
export default OkButton;

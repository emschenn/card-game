import React from "react";
import { motion } from "framer-motion";

interface IProps {
  onOkClick: (e) => void;
  text: string;
}

const OkButton = ({ onOkClick, text }: IProps) => {
  return (
    <motion.button
      className="ok-button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onOkClick}
    >
      {text}
    </motion.button>
  );
};
export default OkButton;

import React from "react";
import { motion } from "framer-motion";

type IProps = {
  children: React.ReactNode;
  variationX: number;
  variationY: number;
  duration: number;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  styles: CSSModule;
};

const Floating = ({
  children,
  variationX,
  variationY,
  duration = 1.5,
  delay = 0,
  style,
  styles,
}: IProps) => {
  return (
    <motion.div
      {...{ style }}
      animate={{ y: [variationY, -variationY], x: [variationX, -variationX] }}
      className={styles.floatingElement}
      transition={{
        delay,
        duration,
        type: "spring",
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Floating;

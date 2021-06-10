import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import useMousePosition from "./useMousePosition";

type IProps = {
  children: React.ReactNode;
  variation?: number[];
  style?: React.CSSProperties;
  styles: CSSModule;
};

const MovingElement = ({
  style,
  children,
  variation: [variationX = 20, variationY = 20] = [20, 20],
  styles,
}: IProps) => {
  const mousePosition = useMousePosition();
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);

  const variationRangeX = [-variationX, variationX];
  const variationRangeY = [-variationX, variationX];
  const translateX = useTransform(tx, variationRangeX, variationRangeX);
  const translateY = useTransform(ty, variationRangeY, variationRangeY);

  React.useEffect(() => {
    const { innerHeight, innerWidth } = window;
    const midHeight = innerHeight / 2;
    const midWidth = innerWidth / 2;
    const [x, y] = mousePosition;
    const percentX = ((x - midWidth) * 100) / midWidth;
    const percentY = ((y - midHeight) * 100) / midHeight;
    tx.set(percentX * (+variationX / 100));
    ty.set(percentY * (+variationY / 100));
  }, [mousePosition]);

  return (
    <motion.div
      className={styles.animationBox}
      style={{ ...style, translateX, translateY }}
    >
      {children}
    </motion.div>
  );
};

export default MovingElement;

import React from "react";
import { AnimateSharedLayout, motion } from "framer-motion";

interface ISection {
  title: string;
  Component: React.ReactNode;
}

interface IProps {
  styles: CSSModule;
  config: ISection[];
  selected: number;
  setSelected: (number) => void;
}

const Header = ({ styles, config, selected, setSelected }: IProps) => {
  return (
    <AnimateSharedLayout>
      <div className={styles.header}>
        {config.map(({ title }, i) => (
          <motion.div
            animate
            key={i}
            className={`${styles.item} title ${
              i === selected && styles.selected
            }`}
            onClick={() => setSelected(i)}
          >
            {i === selected && (
              <motion.div layoutId="underline" className={styles.underline} />
            )}
            {title}
          </motion.div>
        ))}
      </div>
    </AnimateSharedLayout>
  );
};

export default Header;

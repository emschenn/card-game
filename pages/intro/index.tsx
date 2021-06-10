import React from "react";
import styles from "../../styles/Intro.module.scss";

// components
import Props from "../../components/Intro/Props";
import Rule from "../../components/Intro/Rule";

interface IProps {}

const Intro = (props: IProps) => {
  return (
    <div className={styles.intro}>
      <Props styles={styles} />
      <Rule styles={styles} />
    </div>
  );
};

export default Intro;

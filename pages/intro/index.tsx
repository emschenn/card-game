import React from "react";

// components
import Props from "../../components/Intro/Props";
import Rule from "../../components/Intro/Rule";

interface IProps {}

const Intro = (props: IProps) => {
  return (
    <div className="intro">
      <Props />
      <Rule />
    </div>
  );
};

export default Intro;

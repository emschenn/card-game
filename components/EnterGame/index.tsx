import React, { useState } from "react";

import { FirebaseContext } from "../../src/context";

// components
import JoinGame from "./JoinGame";
import SetUpGame from "./SetUpGame";
import AnimateModal from "../ui/AnimateModal";

const EnterGame = () => {
  return (
    <div className="enter-game">
      <SetUpGame />
      <JoinGame />
      {/* <AnimateModal text="遊戲開始" /> */}
    </div>
  );
};

export default EnterGame;

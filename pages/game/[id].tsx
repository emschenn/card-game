import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

// context
import { FirebaseContext } from "../../src/context";

// interface
import { IGameConfig } from "../../interfaces/gameConfig";

// components
import Game from "../../components/Game";
import Loader from "../../components/ui/Loader";
import PoopsLoader from "../../components/ui/PoopsLoader";
import { AnimatePresence, motion } from "framer-motion";

const Poops = styled.div`
  margin: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  background-color: brown;
`;

const GamePage = ({ id }) => {
  const db = useContext(FirebaseContext);

  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<IGameConfig | null>(null);

  useEffect(() => {
    const ref = db.ref(`games/${id}`);
    if (isLoading) {
      ref.on("value", (snapshot) => {
        setGameState(snapshot.val());
        setIsLoading(false);
      });
    }
    return () => ref.off();
  }, []);

  if (isLoading) return <PoopsLoader />;

  return gameState ? (
    <Game id={id} gameState={gameState} setGameState={setGameState} />
  ) : (
    <div>no found</div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: { id: query.id },
});

export default GamePage;

import "../styles/globals.scss";
import { useState } from "react";
import { motion } from "framer-motion";

// context
import { GameContext, FirebaseContext } from "../src/context";
import { firebase } from "../src/initFirebase";

const db = firebase.database();

const containerAnimate = {
  hidden: { y: "-100vh ", opacity: 0 },
  visible: {
    y: "0vh ",
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

function MyApp({ Component, pageProps, router }) {
  const [me, setMe] = useState(null);
  return (
    <GameContext.Provider value={{ me, setMe }}>
      <FirebaseContext.Provider value={db}>
        <motion.div
          key={router.route}
          variants={containerAnimate}
          initial="hidden"
          animate="visible"
        >
          <Component {...pageProps} />
        </motion.div>
      </FirebaseContext.Provider>
    </GameContext.Provider>
  );
}

export default MyApp;

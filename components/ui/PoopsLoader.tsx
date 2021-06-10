import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/CommonUi.module.scss";

const pathVariants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: { duration: 1.5, yoyo: Infinity, ease: "easeInOut" },
  },
};

const PoopsLoader = () => {
  return (
    <div className={styles.poopLoader}>
      <svg
        className={styles.svg}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-30 -30 600 600"
      >
        <motion.path
          d="M418.3,309.8c5.1-1.1,26.5-6.5,38.8-26.4c14.3-23,8.1-52-6-70.4c-14.9-19.5-39.9-29.1-64.9-25.2
 c7-6.6,21.8-22.5,25.3-46.3c1.1-7.1,1.6-17.9-2.5-32.8C393.7,52.8,325.9-14.7,292.6,0c-9.6,4.2-16.5,15.4-18.3,18.3
 c-10.3,16.6-5.1,28-13.8,41.1c-7,10.5-17.7,14.3-29.9,18.6c-35.8,12.7-48.8-3-72.6,7.2c-23.1,9.8-43.6,38.5-39.9,67.6
 c2.9,23,19.7,37.4,25.1,41.7c-5.7-0.9-39.5-5.5-65.6,17.7c-16.6,14.6-36.1,45.7-22.7,71.2C65.6,303.9,91,308.3,95.2,309
 C42.9,315.2,3.4,356.2,0,402.3C-4.1,457.7,44.7,512,109.7,512h292.6c65.3-0.2,113.9-54.7,109.7-109.7
 C508.5,357.2,469.9,316.8,418.3,309.8z"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </div>
  );
};

export default PoopsLoader;

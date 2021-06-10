import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "*.css";

// Accordion list
const Accordion = ({ items, setSelectCard }) => {
  const [active, setActive] = useState(0);

  return (
    items &&
    items.map((item, i) => (
      <AccordionItem
        key={item.id}
        i={i}
        item={item}
        active={active}
        setActive={setActive}
        setSelectCard={setSelectCard}
      />
    ))
  );
};

const AccordionItem = ({ i, item, active, setActive, setSelectCard }) => {
  // Determines if current item is active
  const isActive = active === i;
  return (
    item && (
      <AccordionContainer isActive={isActive}>
        <AccordionTitle isActive={isActive} setActive={setActive} i={i}>
          {item.title}
        </AccordionTitle>
        <AccordionText
          isActive={isActive}
          item={item}
          setSelectCard={setSelectCard}
        >
          {item.text}
        </AccordionText>
      </AccordionContainer>
    )
  );
};

const AccordionTitle = ({ children, isActive, setActive, i }) => (
  <motion.div
    initial={false}
    style={{
      padding: "15px",
      fontWeight: "bold",
      cursor: "pointer",
      position: "relative",
    }}
    animate={{
      backgroundColor: isActive ? "#8b8275" : "#f0f0f0",
      color: isActive ? "#fff" : "#63493b",
      borderTopLeftRadius: isActive ? "5px" : "0px",
      borderTopRightRadius: isActive ? "5px" : "0px",
    }}
    transition={{ duration: 0.1 }}
    onClick={() => setActive(isActive ? false : i)}
  >
    <>
      {children}
      <ChevronIcon isActive={isActive} />
    </>
  </motion.div>
);

const AccordionText = ({ children, isActive, item, setSelectCard }) => (
  <AnimatePresence initial={false}>
    {isActive && (
      <motion.div
        key="text"
        initial="closed"
        animate="active"
        exit="closed"
        style={{ overflow: "hidden", background: "#fff" }}
        variants={{ active: { height: "auto" }, closed: { height: 0 } }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          style={{
            margin: "15px",
          }}
        >
          {children.map((card) => (
            <motion.div
              key={card}
              style={{
                cursor: "pointer",
                display: "inline-block",
                margin: "0.3rem",
              }}
              onClick={() => {
                setSelectCard({ item, cardName: card });
              }}
              whileHover={{ scale: 1.3 }}
            >
              {card}
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const AccordionContainer = ({ children, isActive }) => (
  <motion.div
    initial={false}
    style={{ borderRadius: "5px", marginTop: "20px" }}
    animate={{
      boxShadow: isActive
        ? "0px 3px 5px 0px rgba(200, 200, 200, 1)"
        : "0px 0px 0px 0px rgba(200, 200, 200, 0)",
    }}
    whileHover={{ boxShadow: "0px 3px 5px 0px rgba(200, 200, 200, 1)" }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

const ChevronIcon = ({ isActive }) => (
  <motion.div
    initial={false}
    style={{
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      position: "absolute",
      top: "10px",
      right: "10px",
    }}
    animate={{
      color: isActive ? "#fff" : "#63493b",
      transform: isActive ? "rotate(-180deg)" : "rotate(0deg)",
    }}
    transition={{ duration: 0.4 }}
  >
    <div style={{ transform: "scale(.4) translateY(-10px)" }}>
      <ChevronSvg />
    </div>
  </motion.div>
);

const ChevronSvg = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-up"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
    />
  </svg>
);

export default Accordion;

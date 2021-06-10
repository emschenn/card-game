import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState([0, 0]);

  const mouseHandler = (event: MouseEvent) => {
    const { x, y } = event;
    setMousePosition([x, y]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseHandler);
    return () => {
      window.removeEventListener("mousemove", mouseHandler);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;

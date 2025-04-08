import { useEffect, useState } from "react";

const useWindowHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    setHeight(window.innerHeight); // pega a altura inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
};

export default useWindowHeight;

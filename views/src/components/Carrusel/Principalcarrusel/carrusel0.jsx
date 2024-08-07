import React, { useEffect, useState } from "react";
import { Principalcarrusel1, Principalcarrusel2, Principalcarrusel3, Principalcarrusel4 } from "./Principalcarrusel";


function Principalcarrusel() {
  const slides = [
    <Principalcarrusel1 key="1" />,
    <Principalcarrusel2 key="2" />,
    <Principalcarrusel3 key="3" />,
    <Principalcarrusel4 key="4" />,
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setFade(true);
    }, 1000);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {slides[selectedIndex]}
      </div>
    </div>
  );
}

export default Principalcarrusel;

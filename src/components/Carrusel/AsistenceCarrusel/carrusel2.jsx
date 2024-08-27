import React, { useEffect, useState } from "react";
import {
  AsistenceVector1,
  AsistenceVector2,
  AsistenceVector3,
  AsistenceVector4,
  AsistenceVector5,
  AsistenceVector6,
} from "./AsistenceCarrusel";

function AsistenceCarrusel() {
  const slides = [
    <AsistenceVector1 key="1" />,
    <AsistenceVector2 key="2" />,
    <AsistenceVector3 key="3" />,
    <AsistenceVector4 key="4" />,
    <AsistenceVector5 key="5" />,
    <AsistenceVector6 key="6" />,
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
      const interval = setInterval(nextSlide, 7000);
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
      <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? "bg-[#F0ECE3]" : "bg-[#3F3D56]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default AsistenceCarrusel;

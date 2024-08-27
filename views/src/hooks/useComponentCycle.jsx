import { useEffect, useRef, useState } from "react";

export const useComponentCycle = (components, { onComponentChange }) => {
  const [index, setIndex] = useState(0);
  const [component, setComponent] = useState(components[index]);

  useEffect(() => {
    const selected = components[index];
    setComponent(selected);
    onComponentChange(selected);
  }, [index]);

  const next = () => {
    setIndex((old) => {
      const next = old + 1;
      return next > components.length - 1 ? 0 : next;
    });
  };

  const prev = () => {
    setIndex((old) => {
      const prev = old - 1;
      return prev < 0 ? components.length - 1 : prev;
    });
  };

  return {
    next,
    prev,
    component,
  };
};

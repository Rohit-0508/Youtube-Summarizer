import { useEffect, useState, useRef } from "react";

export default function CountUp({ to, duration = 1500, suffix = "" }) {
  const [value, setValue] = useState(to);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // First render → animate
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      let start = null;

      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = Math.floor(progress * to);

        setValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } 
    // Subsequent updates → instant update
    else {
      setValue(to);
    }
  }, [to, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

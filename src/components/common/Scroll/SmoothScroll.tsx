import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    // INITIALIZE LENIS
    const lenis = new Lenis({
      duration: 1.5, // SLOWER DURATION FOR LUXURY FEEL
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // SMOOTH EXPONENTIAL EASING
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // REDUCED WHEEL SPEED FOR BETTER CONTROL
      touchMultiplier: 1.5,
      infinite: false,
    });

    // TICK FUNCTION FOR RAF
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // CLEANUP
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

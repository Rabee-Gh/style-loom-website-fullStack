import { motion } from "framer-motion";
import { ReactNode } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "blur"
  | "rotate-right"
  | "rotate-left";

interface RevealProps {
  children: ReactNode;
  /** PRESET ANIMATION TYPE */
  variant?: RevealVariant;
  /** ANIMATION DURATION IN SECONDS */
  duration?: number;
  /** DELAY BEFORE ANIMATION STARTS */
  delay?: number;
  /** EASING FUNCTION (CUBIC-BEZIER OR STRING) */
  ease?: any;
  /** SHOULD TRIGGER ONLY ONCE */
  once?: boolean;
  /** WRAPPER CLASSES (FOR POSITIONING) */
  className?: string;
  /** DISTANCE FOR FADE TRANSITIONS (PX) */
  distance?: number;
  /** INITIAL SCALE FOR ZOOM VARIANTS */
  scaleInitial?: number;
  /** INITIAL ROTATION FOR ROTATE VARIANTS */
  rotateInitial?: number;
  /** INITIAL BLUR AMOUNT (PX) */
  blurInitial?: number;
}

/**
 * MASTER MOTION WRAPPER
 * PROVIDES A UNIFIED SYSTEM FOR ALL REVEAL ANIMATIONS.
 */
export const Reveal = ({
  children,
  variant = "fade-up",
  duration = 1.2,
  delay = 0,
  ease = [0.17, 0.55, 0.55, 1],
  once = true,
  className,
  distance = 50,
  scaleInitial = 1,
  rotateInitial = 0,
  blurInitial = 0,
}: RevealProps) => {
  // BASE HIDDEN STATE
  const hiddenState: any = { opacity: 0 };

  // APPLY DISTANCE BASED ON VARIANT
  if (variant === "fade-up") hiddenState.y = distance;
  if (variant === "fade-down") hiddenState.y = -distance;
  if (variant === "fade-left") hiddenState.x = distance;
  if (variant === "fade-right") hiddenState.x = -distance;

  // APPLY SCALE IF PROVIDED (OR ZOOM VARIANTS)
  if (variant === "zoom-in")
    hiddenState.scale = scaleInitial === 1 ? 0.95 : scaleInitial;
  if (variant === "zoom-out")
    hiddenState.scale = scaleInitial === 1 ? 1.05 : scaleInitial;
  if (scaleInitial !== 1) hiddenState.scale = scaleInitial;

  // APPLY ROTATION IF PROVIDED (OR ROTATE VARIANTS)
  if (variant === "rotate-right")
    hiddenState.rotate = rotateInitial === 0 ? 15 : rotateInitial;
  if (variant === "rotate-left")
    hiddenState.rotate = rotateInitial === 0 ? -15 : -rotateInitial;
  if (rotateInitial !== 0) hiddenState.rotate = rotateInitial;

  // APPLY BLUR
  if (variant === "blur" || blurInitial > 0) {
    hiddenState.filter = `blur(${blurInitial === 0 ? 10 : blurInitial}px)`;
  }

  const motionVariants = {
    hidden: hiddenState,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={motionVariants}
      transition={{
        duration,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

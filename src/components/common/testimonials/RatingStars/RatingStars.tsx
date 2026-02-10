import { SHAPES } from "@/constants/shapes";
import { motion } from "framer-motion";

type RatingStarsProps = {
  rate: number;
  starShape?: string;
};

const RatingStars = ({
  rate,
  starShape = SHAPES.LINES.STAR,
}: RatingStarsProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="flex flex-row gap-[5px] items-center justify-start"
    >
      {Array.from({ length: rate }).map((_, index) => (
        <motion.img
          key={index}
          src={starShape}
          alt="testimonial rating"
          variants={{
            hidden: { opacity: 0, scale: 0, x: -10 },
            visible: {
              opacity: 1,
              scale: 1,
              x: 0,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            },
          }}
        />
      ))}
    </motion.div>
  );
};

export default RatingStars;

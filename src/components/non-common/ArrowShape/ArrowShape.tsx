import { SHAPES } from "@/constants/shapes";

type ArrowShapeProps = {
  className?: string;
};

const ArrowShape = ({ className }: ArrowShapeProps) => {
  return (
    <div
      className={`h-[134px] w-[97px] lg:block hidden overflow-hidden ${className}`}
    >
      <div className="absolute top-0 -right-[4px] overflow-hidden h-[67px] w-[97px]">
        <img
          className="absolute -top-[15px] h-[97px] w-[97px]"
          src={SHAPES.LINES.INCLINE_LINE}
          alt="incline-line"
        />
        <img
          className="absolute top-[6px] h-[97px] w-[97px]"
          src={SHAPES.LINES.INCLINE_LINE}
          alt="incline-line"
        />
      </div>
      <div className="absolute top-[67px] -right-[4px] overflow-hidden transform scale-y-[-1] h-[67px] w-[97px]">
        <img
          className="absolute -top-[15px] h-[97px] w-[97px]"
          src={SHAPES.LINES.INCLINE_LINE}
          alt="incline-line"
        />
        <img
          className="absolute top-[6px] h-[97px] w-[97px]"
          src={SHAPES.LINES.INCLINE_LINE}
          alt="incline-line"
        />
      </div>
    </div>
  );
};

export default ArrowShape;

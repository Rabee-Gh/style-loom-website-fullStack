type ButtonCornerStyleProps = {
  className?: string;
};

const ButtonCornerStyle = ({ className }: ButtonCornerStyleProps) => (
  <div
    className={`absolute inset-0 pointer-events-none border border-dashed border-brown-60 rounded-[8px] ${
      className ?? ""
    }`}
  >
    <div className="absolute top-0 left-0 w-[16.5px] h-[16.5px] border-l-2 border-t-2 rounded-tl-[8px]" />
    <div className="absolute top-0 right-0 w-[16.5px] h-[16.5px] border-r-2 border-t-2 rounded-tr-[8px]" />
    <div className="absolute bottom-0 left-0 w-[16.5px] h-[16.5px] border-l-2 border-b-2 rounded-bl-[8px]" />
    <div className="absolute bottom-0 right-0 w-[16.5px] h-[16.5px] border-r-2 border-b-2 rounded-br-[8px]" />
  </div>
);

export default ButtonCornerStyle;

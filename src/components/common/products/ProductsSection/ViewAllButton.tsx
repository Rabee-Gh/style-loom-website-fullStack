interface ViewButtonProps {
  label: string;
  onClick: () => void;
}

export default function ViewAllButton({ label, onClick }: ViewButtonProps) {
  return (
    <button
      className="relative flex justify-center items-center gap-[4px] rounded-xl border-dashed border-very-dark-gray h-[49px] 2xl:h-[63px] cursor-pointer font-normal text-sm 2xl:text-lg leading-[150%] font-roboto py-[14px] px-[20px] 2xl:py-[18px] 2xl:px-[24px] border bg-dark-12 text-white hover:bg-brown-70 hover:text-dark-primary-bg hover:border"
      onClick={onClick}
    >
      {label}
      <div className="pl-[6px]">
         <img src="/assets/icons/general/shop-arrow.svg" alt="shop-arrow"/>
        </div>
      <img className="absolute top-[-1px] left-[-1px]" src="/assets/images/hero/Line1.png" alt="Line1" />
      <img className="absolute top-[-1px] right-[-1px]" src="/assets/images/hero/Line2.png" alt="Line2" />
      <img className="absolute top-full -translate-y-full right-[-1px]" src="/assets/images/hero/Line3.png" alt="Line3" />
      <img className="absolute top-full -translate-y-full left-[-1px]" src="/assets/images/hero/Line4.png" alt="Line4" />
    </button>
  );
}
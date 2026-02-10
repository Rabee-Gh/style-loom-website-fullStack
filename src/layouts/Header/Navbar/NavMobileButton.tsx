export type Props = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavMobileButton = ({ setMenuOpen }: Props) => {
  return (
    <>
      <button onClick={() => setMenuOpen(true)}>
        <img
          src="/assets/icons/general/bars.svg"
          className="p-[10px] flex justify-center items-center w-14 h-14 z-120 rounded-[10px] bg-brown-70 hover:bg-brown-80 cursor-pointer"
          alt="bars"
        />
      </button>
    </>
  );
};

export default NavMobileButton;

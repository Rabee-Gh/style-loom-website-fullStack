import React from "react";

interface AuthFormProps {
  title: string;
  submitText: string;
  children: React.ReactNode;
  onSubmit?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  submitText,
  children,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative overflow-hidden
        w-full max-w-[480px]
        mx-auto
        p-[30px] 2xl:p-[40px]

        flex flex-col
        gap-6 2xl:gap-8

        bg-brown-80 dark:bg-dark-12
        border border-dashed border-dark-15
        rounded-xl 2xl:rounded-2xl
      "
    >
      <div
        className="
          absolute top-0 left-0
          w-4 h-4
          border-t border-l
          rounded-tl-xl
          border-black dark:border-brown-60
        "
      />
      <div
        className="
          absolute top-0 right-0
          w-4 h-4
          border-t border-r
          rounded-tr-xl
          border-black dark:border-brown-60
        "
      />
      <div
        className="
          absolute bottom-0 left-0
          w-4 h-4
          border-b border-l
          rounded-bl-xl
          border-black dark:border-brown-60
        "
      />
      <div
        className="
          absolute bottom-0 right-0
          w-4 h-4
          border-b border-r
          rounded-br-xl
          border-black dark:border-brown-60
        "
      />

      <h2
        className="
          text-center
          font-roboto font-medium
          text-[22px] 2xl:text-[28px]
          dark:text-white
        "
      >
        {title}
      </h2>

      <div className="flex flex-col gap-2 xl:gap-4">
        {children}
      </div>

      <button
        type="submit"
        className="
          p-[14px_20px] 2xl:p-[18px_24px]
          rounded-lg 2xl:rounded-xl

          font-roboto font-medium
          text-[14px] 2xl:text-[18px]
          text-white

          bg-black dark:bg-brown-60
          transition-opacity
          hover:opacity-90
        "
      >
        {submitText}
      </button>
    </form>
  );
};

export default AuthForm;

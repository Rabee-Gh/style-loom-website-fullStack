import { useId, useState } from "react";

interface InputFieldProps {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  name: string;
  required?: boolean;
  autoComplete?: string;
}

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="
        M2.458 12
        C3.732 7.943 7.523 5 12 5
        c4.478 0 8.268 2.943 9.542 7
        -1.274 4.057 -5.064 7 -9.542 7
        -4.477 0 -8.268 -2.943 -9.542 -7Z
      "
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="
        M3 3l18 18
        M10.58 10.58
        A3 3 0 0 0 12 15
        a3 3 0 0 0 2.42 -4.42
        M9.88 5.08
        A9.956 9.956 0 0 1 12 5
        c4.478 0 8.268 2.943 9.542 7
        a9.97 9.97 0 0 1 -1.67 3.043
        M6.61 6.61
        C4.77 7.82 3.32 9.74 2.458 12
        c1.274 4.057 5.064 7 9.542 7
        1.13 0 2.215 -0.186 3.23 -0.53
      "
    />
  </svg>
);

const InputField = ({
  label,
  type = "text",
  placeholder,
  name,
  required = true,
  autoComplete,
}: InputFieldProps) => {
  const id = useId();
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="
          font-roboto
          text-[14px] 2xl:text-[16px]
          text-gray-700 dark:text-gray-200
        "
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          required={required}
          autoComplete={
            autoComplete ??
            (isPassword ? "current-password" : "off")
          }
          className="
            w-full

            bg-brown-70 dark:bg-[#1A1A1A]
            text-black dark:text-white
            caret-black dark:caret-white

            py-[14px] px-5 pr-12
            2xl:py-4.5 2xl:px-6

            rounded-[7px] xl:rounded-lg 2xl:rounded-xl

            border border-dashed border-dark-15
            focus:border-[#1A1A1A]
            dark:focus:border-brown-60
            focus:outline-none

            transition-colors duration-200

            appearance-none shadow-none

            [&:-webkit-autofill]:bg-brown-70
            [&:-webkit-autofill]:text-black
            dark:[&:-webkit-autofill]:bg-[#1A1A1A]
            dark:[&:-webkit-autofill]:text-white
            dark:[&:-webkit-autofill]:shadow-[0_0_0_1000px_#1A1A1A_inset]
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              text-gray-600 dark:text-gray-300

              transition-all duration-300 ease-out
              hover:opacity-80
              focus:outline-none
            "
          >
            <span
              className={`
                inline-flex
                transition-all duration-200 ease-in-out
                ${
                  showPassword
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-70"
                }
              `}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;

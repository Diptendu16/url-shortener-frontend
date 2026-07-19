import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`w-full bg-[#0077B6] dark:bg-[#00B4D8] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#023E8A] dark:hover:bg-[#0096C7] transition-colors disabled:bg-[#90E0EF] dark:disabled:bg-[#023E8A] disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

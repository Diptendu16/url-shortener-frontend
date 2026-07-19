import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#023E8A] dark:text-[#ADE8F4] mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full px-3 py-2 border border-[#90E0EF] dark:border-[#0077B6] rounded-lg bg-white dark:bg-[#03045E] text-[#023E8A] dark:text-[#CAF0F8] placeholder-[#90E0EF] dark:placeholder-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] transition-colors"
        {...props}
      />
    </div>
  );
};

export default Input;

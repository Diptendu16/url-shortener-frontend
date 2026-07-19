import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white dark:bg-[#023E8A] rounded-xl shadow-md dark:shadow-[#03045E]/50 p-6 w-full transition-colors ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

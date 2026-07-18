import type { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 w-full max-w-md transition-colors">
      {children}
    </div>
  );
};

export default Card;

import type { ReactNode } from "react";

const card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
      {children}
    </div>
  );
};

export default card;
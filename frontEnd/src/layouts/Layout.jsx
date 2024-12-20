import React from "react";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-backgroundWhite flex">
      {children}
    </div>
  );
};

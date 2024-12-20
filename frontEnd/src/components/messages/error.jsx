import React from "react";

const ErrorWarning = ({ text }) => {
  return (
    <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
      <p className="text-redFull">{text}</p>
    </div>
  );
};

export default ErrorWarning;

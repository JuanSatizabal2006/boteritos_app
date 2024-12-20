import React from "react";

const SuccessWarning = ({ text }) => {
  return (
    <div className="bg-green-200 rounded-md py-1 px-2 flex gap-3 items-center w-auto text-center">
      <p className="text-greenFull">{text}</p>
    </div>
  );
};

export default SuccessWarning;

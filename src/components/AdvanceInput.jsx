import React, { useState } from "react";

const AdvanceInput = ({ ...props }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={visible ? "text" : "password"}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 px-4 text-gray-500 focus:outline-none"
      >
        {visible ? (
          <img src="/eye_open.svg" className="h-7 w-7" />
        ) : (
          <img src="/eye_closed.svg" className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

export default AdvanceInput;

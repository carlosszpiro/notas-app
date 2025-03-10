import { useState } from "react";
import React from "react";

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const Icon = (
    <i
      className={visible ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
      onClick={() => setVisible((visible) => !visible)}
    />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;

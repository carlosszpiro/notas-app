import { useNavigate } from "react-router-dom";
import React from "react";

const FormSpan = ({ method }) => {
  const navigate = useNavigate();
  const isLogin = method === "login";

  const handleClick = () => {
    navigate(isLogin ? "/register" : "/login");
  };

  return (
    <p className="mt-5 text-center cursor-pointer text-sm/6 text-gray-500">
      <a
        className="font-semibold text-indigo-600 hover:text-indigo-500"
        onClick={handleClick}
      >
        {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}
      </a>
    </p>
  );
};

export default FormSpan;

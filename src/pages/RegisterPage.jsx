import Form from "../components/Form";
import React from "react";

const RegisterPage = () => {
  return <Form route="/api/v1/users/registro/" method="register" />;
};

export default RegisterPage;

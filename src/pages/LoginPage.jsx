import Form from "../components/Form";
import React from "react";

const LoginPage = () => {
  return <Form route="/api/v1/users/token/" method="login" />;
};

export default LoginPage;

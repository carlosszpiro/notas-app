import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NotePage from "./pages/NotePage";
import EditNotePage from "./pages/EditNotePage";
import CreateNotePage from "./pages/CreateNotePage";

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};

const LogoutAndRegister = () => {
  localStorage.clear();
  return <RegisterPage />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<LogoutAndRegister />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/note/:id"
          element={
            <PrivateRoute>
              <NotePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/note/edit/:id"
          element={
            <PrivateRoute>
              <EditNotePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/note/create"
          element={
            <PrivateRoute>
              <CreateNotePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

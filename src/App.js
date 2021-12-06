import React from "react";
import LoginPage from "./pages/login";
import RegistrationPage from "./pages/registration";
import MainPage from "./pages/main";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-300">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function buildAxios() {
  return axios.create({
    baseURL: "http://localhost:3001",
    timeout: 5000,
  });
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    buildAxios()
      .post(`/api/auth/login`, {
        email: login.email,
        password: login.password,
      })
      .then((res) => {
        console.log("success");
        console.log(res);
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
        navigate("/main");
      })
      .catch((error) => {
        console.error(error);
        alert("Email or password wrong!");
      });
  };
  return (
    <div className="flex justify-center items-center bg-gray-300 text-black h-screen">
      <div className=" rounded-xl w-5/12 bg-white py-10 px-20 space-y-5">
        <p className="text-4xl font-bold">Login</p>
        <div className="flex flex-col space-y-3">
          <input
            className="focus:outline-none border border-gray-200 rounded p-2 w-full"
            type="email"
            placeholder="email"
            onChange={(e) => {
              setLogin(Object.assign({}, login, { email: e.target.value }));
            }}
          />
          <input
            className="focus:outline-none border border-gray-200 rounded p-2"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setLogin(Object.assign({}, login, { password: e.target.value }));
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="py-3 bg-purple-600 text-white rounded-3xl font-semibold w-full"
        >
          Sign in
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="w-full text-primary"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

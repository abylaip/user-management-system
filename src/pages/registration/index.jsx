import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function buildAxios() {
  return axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
  });
}

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    surname: "",
    patronimyc: "",
    email: "",
    password: "",
    confirm: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (register.password === register.confirm) {
      buildAxios()
        .post(`/api/auth/`, {
          name: register.name,
          surname: register.surname,
          patronimyc: register.patronimyc,
          email: register.email,
          password: register.password,
        })
        .then((res) => {
          console.log("success");
          console.log(res);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          alert("Please fill all fields!");
        });
    } else {
      alert("Passwords are not same");
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-300 text-black h-screen">
      <div className="rounded-xl w-5/12 bg-white py-12 px-20 space-y-5">
        <p className="text-4xl font-bold">Register</p>
        <div className="flex flex-col space-y-3">
          <input
            className="focus:outline-none border border-gray-200 rounded p-2"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setRegister(
                Object.assign({}, register, { name: e.target.value })
              );
            }}
          />
          <input
            className="focus:outline-none border border-gray-200 rounded p-2"
            type="text"
            placeholder="Surname"
            onChange={(e) => {
              setRegister(
                Object.assign({}, register, { surname: e.target.value })
              );
            }}
          />
          <input
            className="focus:outline-none border border-gray-200 rounded p-2"
            type="text"
            placeholder="Patronymic"
            onChange={(e) => {
              setRegister(
                Object.assign({}, register, { patronimyc: e.target.value })
              );
            }}
          />
          <input
            className="focus:outline-none border border-gray-200 rounded p-2"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setRegister(
                Object.assign({}, register, { email: e.target.value })
              );
            }}
          />
          <input
            className="focus:outline-none border border-gray-200 rounded p-2"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setRegister(
                Object.assign({}, register, { password: e.target.value })
              );
            }}
          />
          <input
            className="focus:outline-none border border-gray-200 rounded p-2"
            type="password"
            placeholder="Password confirmation"
            onChange={(e) => {
              setRegister(
                Object.assign({}, register, { confirm: e.target.value })
              );
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="py-3 bg-purple-600 text-white rounded-3xl font-semibold w-full"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;

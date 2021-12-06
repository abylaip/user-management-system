import React, { useState, useEffect } from "react";
import axios from "axios";

function buildAxios() {
  return axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

const MainPage = () => {
  const [active, setActive] = useState({
    active: false,
    id: "",
  });
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    patronimyc: "",
    email: "",
    password: "",
    confirm: "",
  });
  useEffect(() => {
    buildAxios()
      .get(`/api/users/all`)
      .then((response) => {
        console.log("Users loaded");
        setUsers(response.data);
      });
  }, []);

  function handleChangeInfo(_id) {
    console.log(_id);
    console.log(form);
    setActive(false);
    if (form.password === form.confirm) {
      buildAxios()
        .put(`/api/users/${_id}`, {
          name: form.name,
          surname: form.surname,
          patronimyc: form.patronimyc,
          email: form.email,
          password: form.password,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Something went wrong, write information correctly");
        });
      window.location.reload();
    } else {
      alert("Password and password confirmation should be same");
    }
  }
  return (
    <div className="bg-gray-300 text-black container py-10 space-y-10 h-screen">
      <p className="text-xl">Users</p>
      <div className="rounded-2xl p-10 bg-white space-y-5">
        <p className="font-bold">User Management System</p>
        <div className="overflow-auto h-96 space-y-3">
          {users.map((item) => {
            return (
              <div>
                <div className="grid grid-cols-12">
                  <div className="col-start-1 col-end-4">
                    <p className="font-bold">
                      {item.name} {item.surname}
                    </p>
                  </div>
                  <div className="col-start-4 col-end-7">
                    <p>{item.email}</p>
                  </div>
                  <div className="col-start-7 col-end-10">
                    <p>{item.password}</p>
                  </div>
                  <div className="col-start-10 col-end-13">
                    <button
                      id={item.id}
                      onClick={() => setActive({ active: true, id: item.id })}
                      className="btn border-none modal-button p-2 bg-green-400 rounded-3xl text-white w-full"
                    >
                      edit info
                    </button>
                    <div
                      id="my-modal"
                      className={`modal ${active.active && "modal-open"}`}
                    >
                      <div class="modal-box">
                        <div className="rounded-xl w-full bg-white py-12 px-20 space-y-5">
                          <p className="text-4xl font-bold">Edit</p>
                          <div className="flex flex-col space-y-3">
                            <input
                              className="focus:outline-none border border-gray-200 rounded p-2"
                              type="text"
                              placeholder="Name"
                              onChange={(e) =>
                                setForm(
                                  Object.assign({}, form, {
                                    name: e.target.value,
                                  })
                                )
                              }
                            />
                            <input
                              className="focus:outline-none border border-gray-200 rounded p-2"
                              type="text"
                              placeholder="Surname"
                              onChange={(e) =>
                                setForm(
                                  Object.assign({}, form, {
                                    surname: e.target.value,
                                  })
                                )
                              }
                            />
                            <input
                              className="focus:outline-none border border-gray-200 rounded p-2"
                              type="text"
                              placeholder="Patronymic"
                              onChange={(e) =>
                                setForm(
                                  Object.assign({}, form, {
                                    patronimyc: e.target.value,
                                  })
                                )
                              }
                            />
                            <input
                              className="focus:outline-none border border-gray-200 rounded p-2"
                              type="email"
                              placeholder="Email"
                              onChange={(e) =>
                                setForm(
                                  Object.assign({}, form, {
                                    email: e.target.value,
                                  })
                                )
                              }
                            />
                            <input
                              className="focus:outline-none border border-gray-200 rounded p-2"
                              type="password"
                              placeholder="Password"
                              onChange={(e) =>
                                setForm(
                                  Object.assign({}, form, {
                                    password: e.target.value,
                                  })
                                )
                              }
                            />
                            <input
                              className="focus:outline-none border border-gray-200 rounded p-2"
                              type="password"
                              placeholder="Password confirmation"
                              onChange={(e) =>
                                setForm(
                                  Object.assign({}, form, {
                                    confirm: e.target.value,
                                  })
                                )
                              }
                            />
                            <button
                              onClick={(e) => handleChangeInfo(active.id)}
                              className="py-3 bg-purple-600 text-white rounded-3xl font-semibold w-full"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

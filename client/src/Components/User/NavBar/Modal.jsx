import GoogleButton from "react-google-button";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "../../../assets/axiosForCinema";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";


const LoginPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [Gavatar, setGAvatar] = useState(null);
  const [Eror, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  //signup
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlesubmit = async () => {
    try {
      console.log(formData);
      const data = await axios
        .post(
          "/signup",
          { ...formData },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (error) { }
  };
  //login

  const loginHandleChange = (event) => {
    try {
      const { id, value } = event.target;
      setLoginData({ ...loginData, [id]: value });
    } catch (error) { }
  };

  const LoginHandle = async () => {
    try {
      const data = await axios
        .post(
          "/login",
          { ...loginData },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          if (response.data.token) {
            
            setIsOpen(false);
            localStorage.setItem("token", response.data.token);
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          if (err.response.data.error) {
            setError(err.response.data.error);
            setTimeout(() => {
              setError("");
            }, 3500);
          }

          console.log(err.response.data.error, "errrrrrrr");
        });
    } catch (error) { }
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setAvatar(decoded.email.charAt(0));
    }
  };

  useEffect(() => {
    const Gtoken = localStorage.getItem("Gtoken");
    if (Gtoken) {
      let Googledecoded = jwt_decode(Gtoken);
      console.log(Googledecoded);
      if (!avatar) {
        setGAvatar(Googledecoded.picture);
      }
    }

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setAvatar(decoded.email.charAt(0));
      
    }
  }, [localStorage, Gavatar]);
  return (
    <>
      {Gavatar && (
        <div className="flex flex-col justify-center">
          <Avatar
            alt="Remy Sharp"
            src={Gavatar}
            sx={{ bgcolor: deepPurple[500] }}
          ></Avatar>{" "}
          <button
            onClick={() => {
              localStorage.removeItem("Gtoken");
              setGAvatar(null);
            }}
            className="px-2 text-white bg-red-600 rounded-md"
          >
            logOut
          </button>{" "}
        </div>
      )}
      {!avatar ? (
        <button
          className="px-6 py-3 text-white bg-red-600 rounded-md"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Login
        </button>
      ) : (
        <div className="flex flex-col justify-center">
          {avatar && (
            <Avatar
              alt="Remy Sharp"
              src=""
              sx={{ bgcolor: deepPurple[500], marginLeft: "10px" }}
            >
              {" "}
              {avatar}{" "}
            </Avatar>
          )}

          {Gavatar ? (
            <Avatar
              alt="Remy Sharp"
              src={Gavatar}
              sx={{ bgcolor: deepPurple[500] }}
            ></Avatar>
          ) : (
            " "
          )}

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setAvatar(null);
            }}
            className="px-2 text-white bg-red-600 rounded-bl-full rounded-br-full"
          >
            logOut
          </button>
        </div>
      )}

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            setIsOpen(false);
            setShowRegister(false);
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {showRegister ? (
                  // sign Up ::::::::::::::::::::::::::::::::::::::::::::::
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      Welcome New!
                    </h2>
                    <div className="mb-4">
                      <input
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-red-500"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        value={formData.email}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-red-500"
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Enter your Number"
                        onChange={handleInputChange}
                        value={formData.phone}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-red-500"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={handleInputChange}
                        value={formData.password}
                        required
                      />
                    </div>
                    <button
                      className="w-full px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                      type="submit"
                      onClick={(e) => {
                        setShowRegister(false);
                        handlesubmit();
                      }}
                    >
                      Register
                    </button>
                    <p className="mt-4 text-gray-600 text-center">
                      Already have an account?{" "}
                      <button
                        className="text-red-500 hover:text-red-700 font-bold focus:outline-none"
                        onClick={() => {
                          setShowRegister(false);
                        }}
                      >
                        Login here.
                      </button>
                    </p>
                  </form>
                ) : (
                  //sign UP :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                  // loging.....................................
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      Welcome Back!
                    </h2>
                    <div className="mb-4">
                      <input
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-red-500"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={loginHandleChange}
                        value={loginData.email}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-red-500"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={loginHandleChange}
                        value={loginData.password}
                        required
                      />
                    </div>
                    <button
                      className="w-full px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                      type="submit"
                      onClick={(e) => {
                        LoginHandle();
                      }}
                    >
                      Login
                    </button>
                    <span className="text-[#c40b0b]">{Eror}</span>
                    <h2 className="text-2xl font-bold mb-4 text-center mt-2">
                      OR
                    </h2>
                    <div className="flex justify-center">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          localStorage.setItem(
                            "Gtoken",
                            credentialResponse.credential
                          );
                          setGAvatar(Googledecoded.picture);

                          let Googledecoded = jwt_decode(Gtoken);
                          console.log(Googledecoded);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </div>

                    {/* <button
                      className="w-full px-4 py-2 text-lg font-bold text-black  rounded-lg focus:outline-none focus:bg-red-700 mt-4"
                      type="submit">
                      Login With OTP
                    </button> */}

                    <p className="mt-4 text-gray-600 text-center">
                      Don't have an account yet?{" "}
                      <button
                        className="text-red-500 hover:text-red-700 font-bold focus:outline-none"
                        onClick={() => setShowRegister(true)}
                      >
                        Register here.
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginPage;

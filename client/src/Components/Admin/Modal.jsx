import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "../../Assets/axiosForAdmin";

export default function Modal(props) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(props.user);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      phone: user.phone,
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email Required";
      } else if (!values.phone) {
        errors.phone = "Enter Proper phone number";
      } else if (!/^[0-9]+$/.test(values.phone)) {
        errors.phone = "Only Numbers Allowed";
      } else if (values.phone.length != 10) {
        errors.phone = "Number Shoul be 10 ";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setShowModal(false);
      values._id = user._id;
      axios
        .put(
          "admin/edit-user",
          { ...values },
          { withCredentials: true }
        )
        .then((resp) => {
          navigate("/dashboard/view-users");
        });
    },
  });

  return (
    <>
      <button
        className="text-white focus:ring-4  bg-blue-700 hover:bg-blue-800 w-20  hover:ring-red-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    <span className="text-black">Edit User</span>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative p-6 flex-auto">
                    <div className="w-full  px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        Email
                      </label>
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">
                          {formik.errors.email}
                        </div>
                      ) : null}
                      <input
                        {...formik.getFieldProps("email")}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="email"
                        name="email"
                        placeholder="Name"
                        // defaultValue={}
                      />
                    </div>
                    <div className="w-full  px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        phone number
                      </label>
                      <input
                        {...formik.getFieldProps("phone")}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 round
                ed py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        name="phone"
                        // defaultValue={user.phone}
                        placeholder="Phone Number"
                      />

                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-500">
                          {formik.errors.phone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

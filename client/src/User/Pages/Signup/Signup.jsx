import React, { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { usersignUpPost } from "../../../utils/Constants";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  //username
  if (!values.username) {
    errors.username = toast.error("Username is required");
  } else if (values.username.includes(" ")) {
    errors.username = toast.error("Invalid username");
  } else if (values.username.length < 5) {
    errors.username = toast.error("Username must contain five characters");
  } else if (
    /[0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g.test(
      values.username
    )
  ) {
    errors.username = toast.error(
      "Username does not contain special characters"
    );
  }

  //email
  if (!values.email) {
    errors.email = toast.error("Email is required");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = toast.error("Invalid email address");
  }

  //password
  if (!values.password) {
    errors.password = toast.error("Password is required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Password cannot contain spaces");
  } else if (values.password.length < 8) {
    errors.password = toast.error("Password must be at least 8 characters long");
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = toast.error("Password must contain at least one lowercase letter");
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = toast.error("Password must contain at least one uppercase letter");
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = toast.error("Password must contain at least one digit");
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password = toast.error("Password must contain at least one special character (!@#$%^&*)");
  }

  //confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = toast.error("Confirm Password is required");
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = toast.error("Passwords do not match");
  }

  return errors;
};

const Usersignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
        const { confirmPassword, ...formData } = values; // Exclude confirmPassword field from the form data
  
        try {
          const url = usersignUpPost;
          const { values: res } = await axios.post(url, formData);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
      

        toast.success("Signup successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        // Clear the form fields after successful submission
        formik.resetForm();
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    },
  });

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Toaster position="top-center" reverseOrder={false}></Toaster>

          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              LOGIN
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            method="POST"
            className={styles.form_container}
            onSubmit={formik.handleSubmit}
          >
            <h1>
              CREATE ACCOUNT
            </h1>
            <br />
            <input
              type="text"
              placeholder="User Name"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={styles.input}
            />
            

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={styles.input}
            />
            

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={styles.input}
            />
           

            {error && <div className={styles.error_msg}>{error}</div>}

            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
          <ToastContainer />
          <span className={styles.loginSpan}>
            Don't have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Usersignup;

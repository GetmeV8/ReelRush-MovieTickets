import React, { useEffect } from 'react';
import userAxios from '../../../Assets/axiosForUser';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('authTokens');

function Signup() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     navigate('/');
  //   }
  // }, [token, navigate]);

  const generateError = (error) => {
    toast.error(error, {
      position: 'top-center',
    });
  };

  const generateSuccess = (message) => {
    toast.success(message, {
      position: 'top-center',
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmpassword: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Email is required';
      }

      if (!values.name) {
        errors.name = 'Name is required';
      }

      if (!values.phone) {
        errors.phone = 'Phone number is required';
      } else if (values.phone.length !== 10) {
        errors.phone = 'Phone number should be 10 digits';
      } else if (!/^[0-9]+$/.test(values.phone)) {
        errors.phone = 'Phone number should only contain digits';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      if (values.password !== values.confirmpassword) {
        errors.confirmpassword = 'Passwords do not match';
      }

      return errors;
    },
    onSubmit: async (values, { setFieldError }) => {
      try {
        if (formik.errors.email || formik.errors.name || formik.errors.phone || formik.errors.password || formik.errors.confirmpassword) {
          generateError('Please fill in all fields correctly');
          return;
        }

        const response = await userAxios.post('/signup', values, { withCredentials: true });

        if (!response.data.created) {
          if (response.data.exists) {
            setFieldError('email', 'User with this email already exists');
          } else if (response.data.errors) {
            const { email, password } = response.data.errors;
            if (email) {
              setFieldError('email', email);
            } else if (password) {
              setFieldError('password', password);
            }
          }
        } else {
          generateSuccess('Account created successfully!');
          navigate('/login');
        }
      } catch (error) {
        console.log(error, 'Error from ClientAxios');
      }
    },
  });

  return (
    <>
      <section className="h-screen justify-center items-center bg-black text-white">
        <div className="container mx-auto flex justify-center items-center h-full">
          <div className="dark-mode md:w-3/4 lg:w-1/2 xl:w-3/5 xl:pl-10 mt-10 md:mt-0">
            <h1 className="w-full text-3xl font-thin text-[#f8f8f8]">
              ReelRush<sup className="text-red-700">ORG</sup>
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <input
                  {...formik.getFieldProps('email')}
                  name="email"
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-lg border text-center border-white focus:outline-none focus:border-primary-500 text-black"
                  placeholder="Email Address"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  {...formik.getFieldProps('name')}
                  name="name"
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-lg border text-center border-white focus:outline-none focus:border-primary-500 text-black"
                  placeholder="Username"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  {...formik.getFieldProps('phone')}
                  name="phone"
                  type="text"
                  id="phone"
                  className="w-full p-3 rounded-lg text-center border border-white focus:outline-none focus:border-primary-500 text-black"
                  placeholder="Phone Number"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500">{formik.errors.phone}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  {...formik.getFieldProps('password')}
                  name="password"
                  type="password"
                  id="password"
                  className="w-full p-3 rounded-lg border text-center border-white focus:outline-none focus:border-primary-500 text-black"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  {...formik.getFieldProps('confirmpassword')}
                  name="confirmpassword"
                  type="password"
                  id="confirmpassword"
                  className="w-full p-3 rounded-lg border text-center border-white focus:outline-none focus:border-primary-500 text-black"
                  placeholder="Confirm Password"
                />
                {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                  <div className="text-red-500">{formik.errors.confirmpassword}</div>
                )}
              </div>
              <div className="mb-3 mt-4">
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg text-xl text-white bg-red-700"
                >
                  REGISTER
                </button>
                <span className="bg-red-700">{formik.errors?.login}</span>
                <p className="text-sm font-bold mt-2 justify-center">
                  Already have an account?{' '}
                  <Link to="/login">
                    <button className="text-red-500">Login</button>
                  </Link>
                </p>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </section>
    </>

  );
}

export default Signup;












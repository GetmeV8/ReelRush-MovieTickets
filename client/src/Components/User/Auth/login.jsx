import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import userAxios from '../../../Assets/axiosForUser';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setUserTokens } from '../../../Config/redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from "@react-oauth/google";



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // error
    const generateError = (error) =>
        toast.error(error, {
            position: 'top-center',
        });

    // formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Email Required';
            } else if (!values.password) {
                errors.password = 'Password Required';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem("authTokens");
                const response = await userAxios.post(
                    '/login',
                    {
                        ...values,
                    },
                    { withCredentials: true }
                );

                console.log("login", response)
                if (response.data?.created) {
                    const authTokens = JSON.stringify(response.data?.data)
                    localStorage.setItem("authTokens", authTokens)
                    console.log("REspppppdata", response.data)
                    console.log("AuthTokens :", authTokens)
                    const payload = {
                        authTokens: authTokens,
                        user: jwtDecode(response.data?.data?.access)
                    }
                    dispatch(setUserTokens(payload))
                    navigate('/');
                }
            } catch (error) {
                generateError(error.response?.data?.error || 'Invalid error');
            }
        },
    });

    return (
        <>
            <section className="h-screen bg-black text-white flex justify-center items-center">
                <div className="container mx-auto">
                    <Link to="/Home">
                        <h1 className="w-full text-3xl font-thin text-[#f8f8f8]">
                            ReelRush<sup className="text-red-700">ORG</sup>
                        </h1>
                    </Link>
                    <div className="flex flex-col justify-center items-center">
                        <div className="md:w-3/4 lg:w-1/2 xl:w-2/5">
                            <div>
                                {/* <Lottie options={defaultOptions} /> */}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:w-3/4 lg:w-1/2 xl:w-3/5 xl:pl-10 mt-10 md:mt-0">
                            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                                <div className="flex flex-row items-center justify-center">
                                    <p className="text-lg font-semibold mr-3">Sign in with</p>
                                    <GoogleLogin />
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-google text-4xl"></i>
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <i className="fas fa-phone-alt text-4xl"></i>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center my-4">
                                    <p className="justify-center font-semibold text-xl">Or</p>
                                </div>

                                <div className="mb-4 mt-6">
                                    <input
                                        {...formik.getFieldProps('email')}
                                        type="email"
                                        id="email"
                                        className="w-full p-3 rounded-lg border text-center border-black focus:outline-none focus:border-primary-500 text-black"
                                        placeholder="Email Address"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="text-red-500">{formik.errors.email}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <input
                                        {...formik.getFieldProps('password')}
                                        type="password"
                                        id="password"
                                        className="w-full p-3 rounded-lg border text-center border-black focus:outline-none focus:border-primary-500 text-black"
                                        placeholder="Password"
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-red-500">{formik.errors.password}</div>
                                    )}
                                </div>
                                <Link
                                    to="/forgotpassword"
                                    className="text-red-600 text-sm font-bold mt-4 items-center w-full text-center"
                                >
                                    Forgot Password ? Verify Here.
                                </Link>
                                <div className="mb-3 mt-4">
                                    <button
                                        type="submit"
                                        className="w-full p-3 rounded-lg text-xl text-white bg-neutral-600"
                                    >
                                        LOGIN
                                    </button>
                                    <p className="text-sm font-bold mt-2 justify-center">
                                        Don't have an account?{' '}
                                        <Link to="/signup">
                                            <button className="text-red-500">Register</button>
                                        </Link>
                                    </p>
                                </div>
                                <ToastContainer />
                            </form>
                            {/* End Form */}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Login;

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

            <section className="h-screen bg-black flex justify-center items-center">
                <div className="bg-black rounded-lg p-10 shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <h1 className="text-3xl text-center text-gray-800 mb-6">Welcome back to ReelRush</h1>

                    <form onSubmit={formik.handleSubmit} className="flex flex-col">
                        <input
                            {...formik.getFieldProps('email')}
                            type="email"
                            id="email"
                            className="input mb-4"
                            placeholder="Email Address"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500">{formik.errors.email}</div>
                        )}

                        <input
                            {...formik.getFieldProps('password')}
                            type="password"
                            id="password"
                            className="input mb-4"
                            placeholder="Password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500">{formik.errors.password}</div>
                        )}

                        <button type="submit" className="btn btn-primary mb-4">
                            LOGIN
                        </button>

                        <Link to="/forgotpassword" className="text-red-600 text-sm font-semibold mb-6">
                            Forgot Password? Verify Here.
                        </Link>

                        <p className="text-center text-sm text-white">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-red-500">
                                Register
                            </Link>
                        </p>
                        <GoogleLogin />

                        <ToastContainer />
                    </form>
                </div>
            </section>

        </>


    );
}

export default Login;

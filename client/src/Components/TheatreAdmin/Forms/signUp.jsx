import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import Theatreaxios from '../../../Assets/axiosForCinema'


import { ToastContainer, toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate()

    const generateError = (error) =>
        toast.error(error, {
            position: 'bottom-right',
        })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            place: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const error = {}
            if (!values.name) {
                error.name = 'Name Required'
            } else if (!values.email) {
                error.email = 'Email Mismatch'
            } else if (!values.place) {
                error.place = 'Place Required'
            } else if (!values.password) {
                error.password = 'Password Required'
            } else if (values.password !== values.confirmPassword) {
                error.confirmPassword = 'Password Mismatch'
            }
            return error
        },
        onSubmit: async (values) => {

            try {
                const response = await Theatreaxios.post(
                    '/theatreAdmin/register',
                    { ...values },
                    { withCredentials: true },
                )
              
                if (response.data.created === true) {
                    navigate('/Cinemas')
                    console.log('Registeration Sucess')
                } else if (response.data.errors) {
                    const { email, password } = response.data.errors
                    if (email) {
                        generateError(email)
                    }
                    console.log(response)
                    console.log('Registeration Failed')
                }
            } catch (error) {
                console.log(error, 'Error from ClientAxios')
            }
        },
    })

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold">REGISTER</h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Theater Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...formik.getFieldProps('name')}
                                    type="text"
                                    name="name"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                                />
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500">{formik.errors.name}</div>
                            ) : null}
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...formik.getFieldProps('email')}
                                    type="text"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                                />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Place
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...formik.getFieldProps('place')}
                                    type="text"
                                    name="place"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                                />
                            </div>
                            {formik.touched.place && formik.errors.place ? (
                                <div className="text-red-500">{formik.errors.place}</div>
                            ) : null}
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...formik.getFieldProps('password')}
                                    type="password"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    {...formik.getFieldProps('confirmPassword')}
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                                />
                            </div>
                            {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword ? (
                                <div className="text-red-500">
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Link
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                to="/login"
                            >
                                Already registered?
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </div>
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup

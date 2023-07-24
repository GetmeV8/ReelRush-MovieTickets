import React from 'react'
import { useFormik } from 'formik'
import axios from '../../../Assets/axiosForAdmin'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const Addusers = () => {

  const navigate = useNavigate()
  const generateError = (error) =>
    toast.error(error, {
      position: 'top-center',
    })

  const formik = useFormik({
    initialValues: {
      email: '',
      name:'',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      // console.log(values.email, values.number.length)
      const errors = {}
      if (!values.email) {
        errors.email = 'Email Required'
      }
      if(!values.name){
        errors.name="Name required"
      }
      if (!values.phone) {
        errors.phone = 'Number Required'
      } else if (!/^[0-9]+$/.test(values.phone)) {
        errors.phone = 'This field should only contain numbers'
      } else if (values.phone.length != 10) {
        errors.phone = 'Number should be 10'
      }

      if (!values.password) {
        errors.password = 'Password Required'
      } else if (!passwordRegex.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password Mismatch'
      }
      return errors
    },
    onSubmit: async (values) => {
      console.log(values, '----users data')
      try {
        const response = await axios.post(
          '/admin/add-users',
          { ...values },
          { withCredentials: true },
        )
        
        
        if (response.data.created == true) {
          navigate('/dashboard')
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
    <div className="h-screen flex justify-center items-center">
      <form className="w-full max-w-lg ml-4" onSubmit={formik.handleSubmit}>
        <h1 className="font-bold text-2xl items-center justify-center flex mb-11">
          ADD USER
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Email
            </label>
            <input
              {...formik.getFieldProps('email')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="email"
              name="email"
              placeholder="Name"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              {...formik.getFieldProps('name')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="name"
              name="name"
              placeholder="Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              phone number
            </label>
            <input
              {...formik.getFieldProps('phone')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 round
                ed py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              name="phone"
              placeholder="Phone Number"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              password
            </label>
            <input
              {...formik.getFieldProps('password')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              confrom password
            </label>
            <input
              {...formik.getFieldProps('confirmPassword')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full px-3 mt-9 items-end flex justify-end">
          <button type="submit"   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Submit
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}

export default Addusers

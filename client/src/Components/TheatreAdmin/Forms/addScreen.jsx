import React, { useState } from 'react';
import { useFormik } from 'formik';
import CinemaAxios from '../../../Assets/axiosForCinema';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AddScreen = () => {
  const generateError = (error) =>
    toast.error(error, {
      position: 'bottom-right',
    })


  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      screentype: '',
      rowcount: '',
      columncount: '',
      totalcount: '',
    },
    validate: (values) => {
      const error = {}
      if (!values.name) {
        error.name = 'Name Required'
      } else if (!values.screentype) {
        error.screentype = 'Type Required'
      } else if (!values.rowcount) {
        error.rowcount = 'Count Required'
      } else if (!values.columncount) {
        error.columncount = 'Count Required'
      } else if (!values.totalcount) {
        error.totalcount = 'Count Required'
      }
      return error
    },
    onSubmit: async (values) => {
      const token = localStorage.getItem('Cinematoken')
      try {

        const response = await CinemaAxios.post(
          '/theatreAdmin/add-screen',
          { ...values }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        },
          { withCredentials: true },
        )

        if (response) {
          if (response.data.created) {
            navigate('/CinemasPannel/view-screens')
          }
        } else {
        }
      } catch (error) {
        console.log(error, 'Error from ClientAxios')
      }
    },
  })

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <form className="w-full max-w-lg ml-4" onSubmit={formik.handleSubmit}>
        <h1 className="font-bold text-2xl items-center justify-center flex mb-11">
          ADD SCREEN
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
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
              type="text"
              name="name"
              placeholder="Screen Name"

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
              Screen Type
            </label>
            <select
              {...formik.getFieldProps('screentype')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="screentype"
              placeholder="date"
            >
              <option value="">Select</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="4D">4DX</option>
            </select>
            {formik.touched.screentype && formik.errors.screentype ? (
              <div className="text-red-500">{formik.errors.screentype}</div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Row count
            </label>
            <input
              {...formik.getFieldProps('rowcount')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              name="rowcount"
              type="number"
              value={formik.values.rowcount}
            />
            {formik.touched.rowcount && formik.errors.rowcount ? (
              <div className="text-red-500">{formik.errors.rowcount}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Column Count
            </label>
            <input
              {...formik.getFieldProps('columncount')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              name="columncount"
              type="number"
              value={formik.values.columncount}
            />
            {formik.touched.columncount && formik.errors.columncount ? (
              <div className="text-red-500">{formik.errors.columncount}</div>
            ) : null}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Total Seats
            </label>
            <input
              {...formik.getFieldProps('totalcount')}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="number"
              name="totalcount"
              readOnly
              value={formik.values.totalcount = formik.values.columncount * formik.values.rowcount}
            />
            {formik.touched.totalcount && formik.errors.totalcount ? (
              <div className="text-red-500">{formik.errors.totalcount}</div>
            ) : null}
          </div>
        </div>


        <div className="w-full px-3 mt-9 items-end flex justify-end">
          <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Submit
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}

export default AddScreen

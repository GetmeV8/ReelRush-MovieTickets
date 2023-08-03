import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Adminaxios from "../../../Assets/axiosForAdmin";
import { useNavigate } from "react-router-dom";
import { storage } from '../../../Config/firebase.js'


export default function Modal(props) {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)

  const [movie, setMovie] = useState(props.movie)
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("props.user");
  const navigate = useNavigate();
  useEffect(() => {
    setMovie(props.movie)
  }, [movie])

  const formik = useFormik({
    initialValues: {
      moviename: movie.moviename,
      releasedate: movie.releasedate,
      description: movie.description,
      genre: movie.genre,
      language: movie.language,
      trailerlink: movie.trailerlink,
      _id: movie._id
    },
    validate: (values) => {
      const error = {}
      if (!values.moviename) {
        error.moviename = 'Name Required'
      } else if (!values.releasedate) {
        error.releasedate = 'Date Required'
      } else if (!values.description) {
        error.description = 'Description Required'
      } else if (!values.trailerlink) {
        error.trailerlink = 'Link Required'
      } else if (!values.genre) {
        error.trailerlink = 'Genre Required'
      } else if (!values.language) {
        error.trailerlink = 'Language Required'
      }
      return error
    },
    onSubmit: async (values) => {
      try {
        let posterUrl1 = movie.poster1;
        let posterUrl2 = movie.poster2;
        let posterUrl3 = movie.poster3;

        // Save image1 to image1 folder
        if (image1) {
          const imageRef = storage.ref(`poster/${image1.name}`);
          if (posterUrl1) {
            // Delete the existing image if it exists
            const existingImageRef = storage.refFromURL(posterUrl1);
            await existingImageRef.delete();
          }
          const uploadTask1 = imageRef.put(image1);
          await uploadTask1;
          posterUrl1 = await imageRef.getDownloadURL();
          console.log(posterUrl1, 'Uploaded image1 URL');
        } else {
          console.log("Image 1 is null or undefined");
        }

        // Save image2 to image2 folder
        if (image2) {
          const imageRef = storage.ref(`poster/${image2.name}`);
          if (posterUrl2) {
            // Delete the existing image if it exists
            const existingImageRef = storage.refFromURL(posterUrl2);
            await existingImageRef.delete();
          }
          const uploadTask2 = imageRef.put(image2);
          await uploadTask2;
          posterUrl2 = await imageRef.getDownloadURL();
          console.log(posterUrl2, 'Uploaded image2 URL');
        } else {
          console.log('Image2 is null or undefined')
        }

        // Save image3 to image3 folder
        if (image3) {
          const imageRef = storage.ref(`poster/${image3.name}`);
          if (posterUrl3) {
            // Delete the existing image if it exists
            const existingImageRef = storage.refFromURL(posterUrl3);
            await existingImageRef.delete();
          }
          const uploadTask3 = imageRef.put(image3);
          await uploadTask3;
          posterUrl3 = await imageRef.getDownloadURL();
          console.log(posterUrl3, 'Uploaded image3 URL');
          setShowModal(false);
        } else {
          console.log('Image3 is null or undefined')
        }

        const response = await Adminaxios.put(
          '/admin/edit-movie',
          { ...values, posterUrl1, posterUrl2, posterUrl3 },
          { withCredentials: true },
        );

        if (response.data.msg) { // Assuming the response key is 'msg', update it if different
          navigate('/dashboard/view-movies');
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error, 'Error from ClientAxios');
      }
    },

  })

  const handleposter1Change = (field, e) => {
    if (e.target.files[0]) {
      setImage1(e.target.files[0])
    }
  }
  const handleposter2Change = (field, e) => {
    if (e.target.files[0]) {
      setImage2(e.target.files[0])
    }
  }
  const handleposter3Change = (field, e) => {
    if (e.target.files[0]) {
      setImage3(e.target.files[0])
    }
  }

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
          <div className=" overflow-x-hidde overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    <span className="text-black text-center">Edit Movie</span>
                  </h3>
                  <button
                    className=" bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6  text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className=" flex justify-center items-center">
                  <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
                    <h1 className="font-bold text-2xl items-center justify-center flex ">
                      ADD MOVIE
                    </h1>
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full md:w-1/2  md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Movie Name
                        </label>
                        <input
                          {...formik.getFieldProps('moviename')}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          name="moviename"
                          placeholder="THE DARK"
                        />
                        {formik.touched.moviename && formik.errors.moviename ? (
                          <div className="text-red-500">{formik.errors.moviename}</div>
                        ) : null}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Release date
                        </label>
                        <input
                          {...formik.getFieldProps('releasedate')}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 round
              ed py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="date"
                          name="releasedate"
                          placeholder="date"
                        />
                        {formik.touched.releasedate && formik.errors.releasedate ? (
                          <div className="text-red-500">{formik.errors.releasedate}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Description
                        </label>
                        <input
                          {...formik.getFieldProps('description')}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="text"
                          name="description"
                          placeholder="Description............"
                        />
                      </div>
                      {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-500">{formik.errors.description}</div>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          Movie poster
                        </label>
                        <input

                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          name="poster1"
                          type="file"
                          onChange={(e) => {
                            handleposter1Change("poster1", e)
                          }}
                        />

                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-state"
                        >
                          side poster
                        </label>
                        <input

                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          name="poster2"
                          type="file"
                          onChange={(e) => {
                            handleposter2Change("poster2", e)
                          }}
                        />

                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-zip"
                        >
                          grand poster
                        </label>
                        <input

                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="file"
                          name="poster3"
                          placeholder="90210"
                          onChange={(e) => {
                            handleposter3Change("poster3", e)
                          }}
                        />
                      </div>
                      {formik.touched.poster3 && formik.errors.poster3 ? (
                        <div className="text-red-500">{formik.errors.poster3}</div>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2 mt-9">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          Genre
                        </label>
                        <input
                          {...formik.getFieldProps('genre')}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          name="genre"
                          type="text"
                          placeholder='Genre'
                        />
                        {formik.touched.genre && formik.errors.genre ? (
                          <div className="text-red-500">{formik.errors.genre}</div>
                        ) : null}
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-state"
                        >
                          language
                        </label>
                        <input
                          {...formik.getFieldProps('language')}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          name="language"
                          type="text"
                          placeholder='Language'
                        />
                        {formik.touched.language && formik.errors.language ? (
                          <div className="text-red-500">{formik.errors.language}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full mt-9">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Trailer link
                      </label>
                      <input
                        {...formik.getFieldProps('trailerlink')}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="text"
                        name="trailerlink"
                        placeholder="Link"
                      />
                      {formik.touched.trailerlink && formik.errors.trailerlink ? (
                        <div className="text-red-500">{formik.errors.trailerlink}</div>
                      ) : null}
                    </div>
                    <div className="w-full px-3 mt-9 items-end flex justify-end">

                      <button onClick={() => {
                        setShowModal(false)
                      }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Cancel
                      </button>
                      <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

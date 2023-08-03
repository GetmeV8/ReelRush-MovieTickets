import React, { useState } from "react";
import { useFormik } from "formik";
import AdminAxios from "../../../Assets/axiosForAdmin";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../Config/firebase.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUpload } from "@fortawesome/free-solid-svg-icons";



const uploadImageToStorage = async (image) => {
  if (!image) {
    console.log("Image is null or undefined");
    return null;
  }
  const imageRef = storage.ref(`poster/${image.name}`);
  await imageRef.put(image);
  const imageUrl = await imageRef.getDownloadURL();
  console.log(imageUrl, `Uploaded ${image.name} URL`);

  return imageUrl;
};


const Addmovieform = () => {
  const [cards, setCaeds] = useState([
    { id: 1, category: 'Drama' },
    { id: 2, category: 'Action' },
    { id: 3, category: 'Thriller' },
    { id: 4, category: 'Sci-fi' },
    { id: 5, category: 'Comedy' },
  ])

  const [language, setLanguage] = useState([
    { id: 1, language: 'Malayalam' },
    { id: 2, language: 'Tamil' },
    { id: 3, language: 'Hindi' },
    { id: 4, language: 'English' },
    { id: 5, language: 'Telugu' },
  ])
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      moviename: "",
      releasedate: "",
      description: "",
      genre: "",
      language: "",
      trailerlink: "",
    },
    validate: (values) => {
      const youtubeUrlPattern =
        /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
      const error = {};
      if (!values.moviename) {
        error.moviename = "Name Required";
      } else if (!values.releasedate) {
        error.releasedate = "Date Required";
      } else if (!values.description) {
        error.description = "Description Required";
      } else if (!values.trailerlink) {
        error.trailerlink = "Link Required";
      } else if (!youtubeUrlPattern.test(values.trailerlink)) {
        error.trailerlink = "Please enter a valid YouTube video link.";
      } else if (!values.genre) {
        error.genre = "Genre Required";
      } else if (!values.language) {
        error.language = "Language Required";
      }
      return error;
    },


    // Inside your onSubmit function
    onSubmit: async (values) => {
      try {
        const posterUrl1 = await uploadImageToStorage(image1);
        const posterUrl2 = await uploadImageToStorage(image2);
        const posterUrl3 = await uploadImageToStorage(image3);

        const response = await AdminAxios.post(
          "admin/add-movies",
          { ...values, posterUrl1, posterUrl2, posterUrl3 },
          { withCredentials: true }
        );

        if (response.data.message) {
          navigate("/dashboard/view-movies");
        } else {
          setErrorMessage(response.data.error);
          console.log(response.data, "Something went wrong");
        }
      } catch (error) {
        console.log(error, "Error from ClientAxios");
      }
    },

  });

  const handleposter1Change = (field, e) => {
    if (e.target.files[0]) {
      setImage1(e.target.files[0]);
      document
        .getElementById("image1")
        .setAttribute("src", URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleposter2Change = (field, e) => {
    if (e.target.files[0]) {
      setImage2(e.target.files[0]);
      document
        .getElementById("image2")
        .setAttribute("src", URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleposter3Change = (field, e) => {
    if (e.target.files[0]) {
      setImage3(e.target.files[0]);
      document
        .getElementById("image3")
        .setAttribute("src", URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="">
      <form className="mx-60" onSubmit={formik.handleSubmit}>
        <h1 className="font-bold text-2xl items-center justify-center flex mb-11">
          ADD MOVIE
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Movie Name
            </label>
            <input
              {...formik.getFieldProps("moviename")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              name="moviename"
              placeholder="Name of the Movie"
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
              {...formik.getFieldProps("releasedate")}
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
              {...formik.getFieldProps("description")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              name="description"
              placeholder="Description"
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
              htmlFor="grid-Poster"
            >
              Movie poster <br />
              {/* <FontAwesomeIcon icon={faUpload} size="5x" className="pl-4" /> */}
            </label>
            <img src="" id="image1" />
            <input
              className="hidden appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-Poster"
              name="poster1"
              type="file"
              onChange={(e) => {
                handleposter1Change("poster1", e);
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-poster2"
            >
              side poster <br />
              {/* <FontAwesomeIcon icon={faUpload} size="5x" className="pl-4" /> */}
            </label>
            <img src="" id="image2" />
            <input
              className="hidden appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-poster2"
              name="poster2"
              type="file"
              onChange={(e) => {
                handleposter2Change("poster2", e);
              }}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              grand poster <br />
              {/* <FontAwesomeIcon icon={faUpload} size="5x" className="pl-4" /> */}
            </label>
            <img src="" id="image3" />
            <input
              className="hidden appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="file"
              name="poster3"
              placeholder="90210"
              onChange={(e) => {
                handleposter3Change("poster3", e);
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

            <select {...formik.getFieldProps("genre")} name="genre"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value={''} >Select</option>
              {cards.map((value) => (<option key={value.id} value={value.category}>{value.category}</option>))}

            </select>

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

            <select {...formik.getFieldProps("language")} name="language"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value={''} >Select</option>
              {language.map((value) => (<option key={value.id} value={value.language}>{value.language}</option>))}

            </select>
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
            {...formik.getFieldProps("trailerlink")}
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
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addmovieform;










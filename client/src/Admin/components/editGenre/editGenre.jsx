import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "../../../utils/axios";
import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editGenre,getGenreone } from "../../../utils/Constants";
import { experimentalStyled as styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { setGenre } from "../../../Admin/Redux/store";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EditGenre = () => {
  
  const { id: genres } = useParams();
  const dispatch = useDispatch();
  
 

  const [genrename,setGenrename] = useState("");
  useEffect(
    (key) => {
      getgenreList();
    },
    [genres]
  );

  const getgenreList = () => {
    // getOneMovies = getOneMovies+`/${movieId}`
    axios
      .get(`${getGenreone}/${genres}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        setGenrename(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };

  const token = useSelector((state) => state.token);
  

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const genrenameId =genrename._id
  const onSubmit = async (data) => {
    const formData = new FormData();
    const datas = {
      genrename: data.genrenamee,
    
    };
    setRefresh(data.genrenamee);
    reset();

    axios
      .post(
        editGenre,
        { datas,genrenameId},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        dispatch(setGenre({ theater: response.data.screeninfo }));

        if (response.data.status) {
          toast.success("Screen Edit successful!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/addgenre");
          }, 2000);
        } else {
          generateError(response.error.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>EDIT GENRE</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(onSubmit)} id="form">
              <div className="formInput">
                <label>Genre Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Screen Name"
                  defaultValue={genrename.genre}
                  onChange={(event) => setGenrename(event.target.value)}
                  {...register("genrenamee", {
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.name?.type === "required" && (
                    <span>Screen Name is required</span>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <span>Screen Name must less than 20 Character</span>
                  )}
                  {errors.name?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              <div className="formInput">
               
                
                <button type="submit">SAVE</button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditGenre;

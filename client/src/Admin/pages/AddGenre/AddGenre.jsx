import "./AddGenre.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "../../../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addgenrepost, deleteGenre, getgenre } from "../../../utils/Constants";
import { experimentalStyled as styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
// import { setTheater } from "../../Redux/store";
import Swal from "sweetalert2";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const AddGenre = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const theater = useSelector((state) => state.theater);
  const [genre, setGenre] = useState([]);
  console.log(genre,'jjjjjjjjjj');

 

  const getOnescreen = useCallback(async () => {
    

    axios
      .get(getgenre, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data,'kkkkkkkk')
        setGenre(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  });
  useEffect(() => {
    getOnescreen();
  },  [getOnescreen]);
  const [err, setErr] = useState(false);

  const genreId = theater?._id;
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

  const onSubmit = async (data) => {
    console.log(data)
    const formData = new FormData();
    const datas = {
      genrename: data.genrename,
    
    };
    setRefresh(data.screenname);
    reset();

    axios
      .post(
        addgenrepost,
        { datas },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        setGenre(response.data.updated);

        if (response.data.status) {
          toast.success(
            `Genre Add successful!`,
            { theme: "light" },
            {
              position: "top-right",
            }
          );
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

  const handleDelete = (genre) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete screen !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${deleteGenre}/${genre}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setGenre(response.data);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      }
    });
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>ADD GENRE</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit(onSubmit)} id="form">
              <div className="formInput">
                <label>Genre Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Genre Name"
                  {...register("genrename", {
                    required: true,
                    maxLength: 10,
                    pattern: /^[A-Z]+$/,
                  })}
                />
                <span style={{ color: "red" }} className="text-danger">
                  {errors.genrename?.type === "required" && (
                    <span>Genre Name is required</span>
                  )}
                  {errors.genrename?.type === "maxLength" && (
                    <span>Genre Name must less than 10 Character</span>
                  )}
                  {errors.genrename?.type === "pattern" && (
                    <span>Genre must be in capital letter</span>
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
        <div className="top">
          <h1>LIST GENRE</h1>
        </div>
        {genre?.map((screenObj) => (
          <div className="bottom" key={screenObj.genre}>
            <div className="left">
              {screenObj.show ? (
                <Grid
                  container
                  spacing={2}
                  columns={12}
                  style={{ paddingLeft: "10px" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Item style={{ backgroundColor: "wheat", color: "black" }}>
                      {screenObj.genre}
                    </Item>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1}>
                    <Item style={{ backgroundColor: "wheat", color: "red" }}>
                      <Link>
                        <DeleteIcon
                          onClick={() => handleDelete(screenObj.genre)}
                        />
                      </Link>
                    </Item>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1}>
                    <Link to={`/editGenre/${screenObj.genre}`}>
                      <Item
                        style={{ backgroundColor: "wheat", color: "green" }}
                      >
                        <EditIcon />
                      </Item>
                    </Link>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  spacing={2}
                  columns={12}
                  style={{ paddingLeft: "10px" }}
                >
                  <Grid item xs={2} sm={2} md={2}>
                    <Item style={{ backgroundColor: "wheat", color: "black" }}>
                      {screenObj.genre}
                    </Item>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1}>
                    <Item style={{ backgroundColor: "wheat", color: "red" }}>
                      <DeleteIcon
                        onClick={() => handleDelete(screenObj.genre)}
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1}>
                    <Link to={`/editGenre/${screenObj.genre}`}>
                      <Item
                        style={{ backgroundColor: "wheat", color: "green" }}
                      >
                        <EditIcon />
                      </Item>
                    </Link>
                  </Grid>
                  
                </Grid>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddGenre;

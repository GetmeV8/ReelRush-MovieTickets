import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./singlemoviepage.css";
import userAxios from "../../../Assets/axiosForUser";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(0),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
// }));
// function valuetext(value) {
//     return `${value}°C`;
// }

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
);

export default function BasicGrid() {
    const [movie, SetMovie] = useState("");

    const { id } = useParams();
    useEffect(() => {
        userAxios.get(`/Movie/${id}`).then((resp) => {
            SetMovie(resp.data);
            // console.log(resp.data);
        });
    }, []);


    const castDetails = [
        {
            name: "Christopher Nolan",
            position: "Director",
        },
        {
            name: "Cillian Murphy",
            position: "Actor",
        },
        {
            name: "Ram K Das",
            position: "Director",
        },
        {
            name: "Ram K Das",
            position: "Director",
        },
        {
            name: "Christopher Nolan",
            position: "Director",
        },
        {
            name: "Christopher Nolan",
            position: "Director",
        },
    ];

    return (
        <>
            <div className="mx-auto p-8 items-center justify-center">
                <div className="bg-white p-8 rounded-lg mb-8 items-center justify-center">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        {movie.moviename} - {new Date(movie.releasedate).getFullYear()}
                    </h1>
                    <div className='text-center flex flex-wrap justify-center'>
                        <img
                            src={movie.poster1}
                            alt="" width={250}
                            className="mx-auto block mb-8 rounded-lg text-center  lg:max-w-screen-lg"
                        />
                        <img
                            src={movie.poster2}
                            alt="" width={250}
                            className="mx-auto block mb-8 rounded-lg text-center  lg:max-w-screen-lg"
                        />
                        <img
                            src={movie.poster3}
                            alt="" width={250}
                            className="mx-auto block mb-8 rounded-lg text-center  lg:max-w-screen-lg"
                        />
                    </div>


                    <div className="text-center">
                        <p className="text-gray-600 mb-4 flex  items-center text-center">
                            {movie.description}
                        </p>
                        <h1 className="font-bold text-2xl uppercase">Details</h1>
                        <div className="text-center">
                            <h5 className='"text-gray-600 mb-4 mt-6 items-center text-center'>
                                Language :{movie.language}
                            </h5>
                            <h5 className='"text-gray-600 mb-4 mt-6 items-center text-center'>
                                Genre :{movie.genre}
                            </h5>
                            <h5 className='"text-gray-600 mb-4 mt-6 items-center text-center'>
                                {/* Release Date :{movie.releasedate} */}
                            </h5>
                        </div>

                    </div>
                    <div className="flex mx-auto items-center flex-wrap justify-center gap-6">
                        <Link to={`/SelectTheater/${movie._id}`}>
                            {" "}
                            <button
                                className="px-6 py-3 w-64 text-white bg-red-600 rounded-md"
                                type="button"
                            >
                                Book
                            </button>
                        </Link>
                        <a href={movie.trailerlink} >
                            <button
                                className="px-6 py-3 w-64 text-white bg-red-600 rounded-md"
                                type="button"
                            >
                                Trailer
                            </button>
                        </a>

                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg flex-wrap">
                    <h2 className="text-2xl font-bold mb-4 text-center">Cast & Crew</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 items-center justify-center">
                        {castDetails.map((cast, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGk0XDPwd63cdXVsxCfKxTn-gEos2wz-A0ocfU8OhTLltxMbuiTRxz35d0TqxUJ0XAFcPTekABTww&usqp=CAU&ec=48600113"
                                    alt=""
                                    className="mb-4 rounded-full w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 object-cover items-center justify-center mx-auto"
                                />
                                <h3 className="text-md font-bold mb-2 w-20 md:w-24 lg:w-24 items-center justify-center mx-auto">
                                    {cast.name}
                                </h3>
                                <p className="text-gray-600 text-center mx-auto">
                                    {cast.position}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="mt-12 text-center font-bold text-xl">
                    UPCOMING MOVIES
                </h2>
                {/* <MovieSlide></MovieSlide> */}
            </div>
        </>
    );
}

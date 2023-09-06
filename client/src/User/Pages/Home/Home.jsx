import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.scss";
import MovieList from "../../Components/movie-list/MovieList";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import Premier from '../../Components/Premier/Premier';
const Userhome = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: "0px" }}>
        <Banner/>
      </div>
      <div
        className=""
        style={{ backgroundColor: "black", paddingTop: "70px" }}
      >
        <h1 style={{ color: "white", paddingLeft: "100px" }}>
          EXPLORE NEW MOVIES
        </h1>
        <br />
      </div>
      <div className="movieslist">
        <MovieList />
      </div>
      <Premier/>
      <Footer />
    </>
  );
};

export default Userhome;

import React, { useState } from "react";
import Premiers from "../../../Components/User/Homepage/premiers";
import NavBar from "../../../Components/User/NavBar/NavBar";
import CurrentMovies from "../../../Components/User/Homepage/currentMovies";
import Moviecategory from "../../../Components/User/Homepage/moviecategory";
import MovieSlide from "../../../Components/User/Homepage/movieSlide";
import Footer from "../../../Components/User/Footer/footer";

const Home = (props) => {
  return (
   
    
  
    <>
      <NavBar/>
      <Premiers/>
      <Moviecategory/>
      <CurrentMovies/>
      <Footer/>
    </>



  );
};

export default Home;

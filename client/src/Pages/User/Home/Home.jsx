import React, { useState } from "react";
import Premiers from "../../../Components/User/Homepage/premiers";
import NavBar from "../../../Components/User/NavBar/NavBar";
import Moviecategory from "../../../Components/User/Homepage/moviecategory";
import Footer from "../../../Components/User/Footer/footer";

const Home = (props) => {
  return (
   
    
  
    <>
      <NavBar />
      <Premiers />
      <Moviecategory />
      <Footer />
    </>



  );
};

export default Home;

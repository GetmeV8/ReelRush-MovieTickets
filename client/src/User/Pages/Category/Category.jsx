import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Category.scss";
import CategoryList from "../../Components/CategoryList/CategoryList";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import Premier from '../../Components/Premier/Premier';
import { useParams } from 'react-router-dom';
const Category = () => {
  const { category } = useParams();
  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: "0px" }}>
        <Banner />
      </div>
      <div
        className=""
        style={{ backgroundColor: "Black", paddingTop: "70px" }}
      >
        <h1 style={{ color: "white", paddingLeft: "100px" }}>
          {category}
        </h1>
        <br />
      </div>
      <div className="movieslist">
        <CategoryList /> 
      </div>
      <Premier/>
      <Footer />
    </>
  );
};

export default Category;

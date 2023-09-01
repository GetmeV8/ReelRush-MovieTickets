import "./BookingDetail.scss";
import Navbar from "../../Components/Navbar/Navbar";
import React from "react";
import { CinemasBody } from "../../Components/BookTickets/CinemasBody";
import { Header } from "../../Components/BookTickets/Header";
import { Filter } from "../../Components/BookTickets/Filter";
import { useParams } from "react-router-dom";

const UserBookings = () => {
  let { id: movieId } = useParams();

  const image =
    "https://t3.ftcdn.net/jpg/03/17/79/66/360_F_317796693_B5yF8ybwUMb3MDhe6QQWGJKQYYNHfxKg.jpg";

  return (
    <div style={{ backgroundColor: "rgb(87,168,204)", paddingBottom: 20 }}>
      <Navbar />
      <div
        className="bannner"
        style={{
          width: "100%",
          height: "300px",
          backgroundImage: `url(${image})`,
        }}
      >
        <Header moviId={movieId} />
      </div>
      <Filter moviId={movieId} />
      <CinemasBody moviId={movieId} />
    </div>
  );
};

export default UserBookings;

import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Pages/User/Home/Home";
import Loginuser from "./Components/User/Auth/login";
import LoginPage from "./Components/Admin/Auth/loginPage";
import Dashboard from "./Pages/Admin/Dashboard/dashboard";
import MainDash from "./Pages/Admin/Dashboard/maindash"
import AddUser from "./Pages/Admin/Users/addUser";
import ViewMovies from "./Pages/Admin/Movies/viewmovies";
import AddMovies from "./Pages/Admin/Movies/addmovies";
import Viewuser from "./Components/Admin/Tables/viewUsers";
import Viewtheatre from "./Pages/Admin/Theatres/viewtheatre";
import AddTheatre from "./Pages/Admin/Theatres/addTheatre";
import MoviePage from "./Pages/User/Home/MoviePage"
import TheatreSelect from "./Pages/User/BookingPage/BookingPage"
import SeatSelector from "./Pages/User/SeatSelector/seatSelector";
import Checkout from "./Components/User/Booking/checkOut";



import CinemasPannel from "./Pages/TheatreAdmin/Dashboard/dashboard";
import DashBoard from "./Pages/TheatreAdmin/Dashboard/DashBoardData"
import Addscreen from "./Pages/TheatreAdmin/Screens/addScreen";
import ViewScreens from "./Pages/TheatreAdmin/Screens/viewScreens";
import ViewShow from "./Pages/TheatreAdmin/Screens/viewShow";
import AddShow from "./Pages/TheatreAdmin/Screens/addShows";

import Signupuser from "./Components/User/Auth/signup";
import Forgotpassword from './Components/User/Auth/forgotpassword'
import NavBar from "./Components/User/NavBar/NavBar";
import Signup from "./Components/TheatreAdmin/Forms/signUp";
import Login from "./Components/TheatreAdmin/Forms/login";
import Approval from "./Pages/TheatreAdmin/404/approval";
import { useSelector } from "react-redux";
// import LoginPage from "./Pages/Admin/LoginPage";



function App() {
  const authTokens = useSelector(s => JSON.parse(s.user.authTokens))
  const token = localStorage.getItem("Admintoken");
  const [loggedIn, setLoggedIn] = useState(null);


  const access = authTokens?.access

  // const Cinematoken = localStorage.getItem("Cinematoken")
  // const [CinemaloggedIn, setCinemaLoggedIn] = useState(null);



  useEffect(() => {
    setLoggedIn(token);
    // setUserLoggedIn(userloggedIn)
    // setCinemaLoggedIn(Cinematoken)

  }, []);

  return (
    <Router>
      <Routes>


        {/* User */}

        <Route path="/login" element={!access ? <Loginuser /> : <Home />} />
        <Route path="/signup" element={<Signupuser />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/" element={<Home />} />
        <Route path={"/movie/:id"} element={<MoviePage />} />
        <Route path={"/SelectTheater/:MovieId"} element={<TheatreSelect/>} />
        <Route path={"/movieseat"}  element={<SeatSelector/>}/>
        <Route path={"/Checkout"} element={<Checkout />}/>






        {/* Admin */}

        <Route path={"/admin"} element={<LoginPage />} />
        <Route path={"/dashboard"} element={<Dashboard />}>
          <Route index element={<MainDash />} />
          <Route path={"view-users"} element={<Viewuser />} />
          <Route path={"add-users"} element={<AddUser />} />
          <Route path={"view-movies"} element={<ViewMovies />} />
          <Route path={"add-movies"} element={<AddMovies />} />
          <Route path={"view-theatres"} element={<Viewtheatre />} />
          <Route path={"add-theatres"} element={<AddTheatre />} />

        </Route>

        {/*Cinemas*/}
        <Route path={"/Cinemas"} element={<Login />}/>
        <Route path={"/Cinemas/Signup"} element={<Signup/>} />
        <Route path={"/approval"} element={<Approval />}/>
        <Route path={"/CinemasPannel"} element={<CinemasPannel/>}>
        <Route index element={<DashBoard />} />
        <Route path={"add-screen"} element={<Addscreen/>} />
        <Route path={"view-screens"} element={<ViewScreens/>}/>
        <Route path={"add-Show"} element={<AddShow/>}/>
        <Route path={"view-Show"} element={<ViewShow />} />





        </Route>



      </Routes>
    </Router>
  );
}

export default App;

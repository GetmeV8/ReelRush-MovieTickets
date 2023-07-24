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
import Viewuser from "./Components/Admin/Tables/viewUsers";
import Viewtheatre from "./Pages/Admin/Theatres/viewtheatre";
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
  console.log(access);

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










        {/* Admin */}

        <Route path={"/admin"} element={<LoginPage />} />
        <Route path={"/dashboard"} element={<Dashboard />}>
          <Route index element={<MainDash />} />
          <Route path={"view-users"} element={<Viewuser />} />
          <Route path={"add-users"} element={<AddUser />} />
          <Route path={"view-theatres"} element={<Viewtheatre />} />

          </Route>

          {/*Cinemas*/}
          <Route path={"/Cinemas"} element={<Login />} />
          <Route path={"/Cinemas/Signup"} element={<Signup />} />
          <Route path={"/approval"} element={<Approval />} />








      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeContext } from "./Context/darkModeContext";
import './App.css';
import "./Style/dark.scss";



//User Imports
import Userlogin from "./User/Pages/Login/Login";
import Userhome from "./User/Pages/Home/Home";
import Usersignup from "./User/Pages/Signup/Signup";
import Otp from "./User/Pages/OTP/Otp";
import OtpPage from "./User/Pages/OTPPAGE/otpPage";
import Profile from "./User/Pages/Profile/Profile";
import Profileedit from "./User/Components/Profileedit/Profileedit";
import Moviedetails from "./User/Pages/detail/Detail";
import UserBookings from "./User/Pages/BookingDetails/BookingDetails";
import Category from "./User/Pages/Category/Category";
import Seating from "./User/Components/Seating/Seating";
import SummaryPage from "./User/Pages/SummeryPage/SummeryPage";
import Ticket from "./User/Components/OrderHistory/Ticket";

// Admin Imports
import AdminLogin from "./Admin/pages/Login/Login";
import Single from "./Admin/pages/userList/Single";
import New from "./Admin/pages/ADDMOVIE/New";
import Home from "./Admin/pages/Home/Home";
import AddGenre from "./Admin/pages/AddGenre/AddGenre";
import EditGenre from "./Admin/components/editGenre/editGenre";
import MovieList from "./Admin/pages/MovieList/MovieList";
import Singles from "./Admin/pages/TheaterList/TheaterList";
import EditMovie from "./Admin/components/EditMovie/EditMovie";
import AddPoster from "./Admin/pages/AddPoster/Poster";
import PosterList from "./Admin/components/list/list";
import EditPoster from "./Admin/components/EditPoster/EditPoster";
import TheaterView from "./Admin/pages/TheaterList/TheaterView";
import BookingViewList from "./Admin/components/UserBookingViewList/BookingViewList";
import BookingDetails from "./Admin/components/UserBookingMnage/BookingList";
import MovieBookingList from "./Admin/pages/TheaterMovieBookingList/MovieBookingList";
import Report from "./Admin/pages/Report/Report";
import Chat from "./Admin/pages/Chat/Chat";


//Theater Imports
import TheaterLogin from './Theater/pages/Login/TheaterLogin';
import TheaterSignup from './Theater/pages/Signup/TheaterSignup';
import TheaterHome from './Theater/pages/Home/TheaterHome';
import TheaterNew from "./Theater/pages/TheaterApplication/New";
import ApplicationEdit from "./Theater/Components/ApplicationEdit/ApplicationEdit";
import Screen from "./Theater/pages/Screen/Screen";
import AddScreen from "./Theater/pages/AddScreen/AddScreen";
import AddDetails from './Theater/pages/AddDetails/AddDetails'
import EditSreen from "./Theater/Components/editSreen/EditScreen";
import EditSreenShow from './Theater/Components/EditScreeShow/EditScreenShow'
import BookingList from "./Theater/Components/BookingMnage/BookingList";
import PaymentList from "./Theater/Components/PaymentManage/PaymentList";
import PaymentViewList from "./Theater/Components/PaymentViewList/PaymentViewList";
import TheaterBookingViewList from "./Theater/Components/BookingViewList/BookingViewList";
import TheaterReport from "./Theater/pages/Report/Report";
import TheaterChat from "./Theater/pages/Chat/Chat";



//common imports
import PageNotFound from "./PageNotFound"
import socket from "./socket.io/socket";
import Loading from "./Components/Loading/loading";
import { setLogout } from "./state/admin/adminSlice";
import AdminLayout from "./Admin/components/layouts/AdminLayout";
import TheaterLayout from "./Theater/Components/layout/theaterLayout";
import { RootState } from "./state/rootstate";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const userToken = useSelector((state) => state?.user?.token);
  const AdminToken = useSelector((state) => state?.admin?.token);
  const TheaterToken = useSelector((state) => state?.theater?.token);
  const isloading = useSelector((state) => state.isloading);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const ProtectedAdminRoute = ({ children, AdminToken }) => {
    if (!AdminToken) {
      return <Navigate to="/adminlogin" />;
    }

    return children;
  };

  const ProtectedUserRoute = ({ children, userToken }) => {
    if (!userToken) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const ProtectedTheaterRoute = ({ children, theaterToken }) => {
    if (!theaterToken) {
      return <Navigate to="/theaterlogin" />;
    }

    return children;
  };

  useEffect(() => {
    socket.emit("newUser", currentUser?._id);
  }, [currentUser]);

  useEffect(() => {
    socket.on("getBlocked", () => {
      dispatch(setLogout());
    });
  }, []);

  return (

    <div className={darkMode ? "app dark" : "app"}>
      <div className="App">
        {isloading && <Loading />}


        <Routes>

          {/* User Routes */}
          <Route path="/login" element={!userToken ? <Userlogin /> : <Navigate to="/" />} />
          <Route path="/">
            <Route index={true} element={<Userhome />} />
            <Route path="/signup" exact element={<Usersignup />} />
            <Route path="/login" exact element={<Userlogin />} />
            <Route path="/otpLogin" exact element={<Otp />} />
            <Route path="/otp" exact element={<OtpPage />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/editProfile" exact element={<Profileedit />} />
            <Route path="/MovieDetails/:id" element={<Moviedetails />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path={"/categorymovie/:category"} element={<Category />} />
            <Route path="/BokingDetails/:id" element={!userToken ? <Userlogin /> : <UserBookings />} />
            <Route path="/booktickets/seats" element={<Seating />} />
            <Route path="/booktickets/summary" element={<SummaryPage />} />
            <Route path="/booking" element={<Ticket />} />
          </Route>

          {/* Admin Routes */}


          <Route path="/adminlogin" element={!AdminToken ? <AdminLogin /> : <Navigate to="/admin" />} />
          <Route path="/admin" element={AdminToken ? <AdminLayout /> : <Navigate to="/Adminlogin" />}>
            <Route index={true} element={<Home />} />
            <Route path="users-list" element={<Single />} />
            <Route path="addMovies" element={<New />} />
            <Route path="addgenre" element={<AddGenre />} />
            <Route path="editGenre/:id" element={<EditGenre />} />
            <Route path="movieList" element={<MovieList />} />
            <Route path="theater-list" element={<Singles />} />
            <Route path="editMovie/:id" element={<EditMovie />} />
            <Route path="editPoster/:id" element={<EditPoster />} />
            <Route path="addPoster" element={<AddPoster />} />
            <Route path="listPoster" element={<PosterList />} />
            <Route path="view/:id" element={<TheaterView />} />
            <Route path="salesreport" element={<Report />} />
            <Route path="Bookingview/:id" element={<BookingViewList />} />
            <Route path="userBooking" element={<BookingDetails />} />
            <Route path="theaterBooking" element={<MovieBookingList />} />
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>



          {/* Theater routes*/}


          <Route path="/theaterlogin" element={!TheaterToken ? <TheaterLogin /> : <Navigate to="/theater" />} />
          <Route path="theatersignup" element={!TheaterToken ? <TheaterSignup /> : <Navigate to="/theaterlogin" />} />
          <Route path="/theater" element={TheaterToken ? <TheaterLayout /> : <Navigate to="/theaterlogin" />}>
            <Route index={true} element={<TheaterHome />} />
            <Route path="application" element={<TheaterNew />} />
            <Route path="EditApplication" element={<ApplicationEdit />} />
            <Route path="screen" element={<Screen />} />
            <Route path="addscreens" element={<AddScreen />} />
            <Route path="editSreen/:id" element={<EditSreen />} />
            <Route path="addTheaterDetails/:id" element={<AddDetails />} />
            <Route path="editSreenShow/:id" element={<EditSreenShow />} />
            <Route path="BookingDetails" element={<BookingList />} />
            <Route path="PaymentDetails" element={<PaymentList />} />
            <Route path="Paymnetview/:id" element={<PaymentViewList />} />
            <Route path="Bookingview/:id" element={<TheaterBookingViewList />} />
            <Route path="salesreport" element={<TheaterReport />} />
            <Route path="chat" element={<TheaterChat />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;


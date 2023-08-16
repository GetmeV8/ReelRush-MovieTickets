// // import Navbar from "../../../Components/User/NavBar/NavBar";
// // import { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import { Box } from "@mui/system";
// // import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// // import {
// //   IconButton,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Typography,
// // } from "@mui/material";
// // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import axios from "../../../Assets/axiosForUser"
// // const Profile = () => {
// //   const user = useSelector((state) => state.user);
// //   const [bookings, setBookings] = useState();
// //   const { userId } = useParams()


// //   const [userDetails, setUserDetails] = useState(null);

// //   useEffect(() => {
// //     // Make an Axios GET request to fetch user details
// //     axios.get(`/bookingdetails/${user._id}`)
// //       .then(response => {
// //         // Update the userDetails state with fetched data
// //         console.log(response.data)
// //         setUserDetails(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching user details:', error);
// //       });
// //   }, [userId]); // The effect will re-run whenever userId changes


// //   const handleDelete = (id) => {
// //     // deleteBooking(id)
// //     //   .then((res) => console.log(res))
// //     //   .catch((err) => console.log(err));
// //   };


// //   return (

// //   );
// // };

// // export default Profile;



import Navbar from "../../../Components/User/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import api from "../../../Assets/Interceptors/userInterface"


const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user)
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);

  const handleDelete = (id) => {
    //     // deleteBooking(id)
    //     //   .then((res) => console.log(res))
    //     //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Make an Axios GET request to fetch user details and bookings
    api.get("/bookingdetails")
      .then(response => {
        // Extract user and bookings data from the response
        const { user, bookings } = response.data;
  
        // Update the userDetails state with fetched user data
        setUserDetails(user);
  
        // Update the bookings state with fetched booking data
        setBookings(bookings);
      })
      .catch(error => {
        console.error('Error fetching user details and bookings:', error);
      });
  }, [user]);

  // Rest of your code...

  return (
    <>
      <Box width={"100%"} display="flex">
        {" "}
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name: {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {user.email}
            </Typography>
          </Box>
        )}
        {bookings && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie: {booking.movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Seat: {booking.seatNumber}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Date: {new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Profile;

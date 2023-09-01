import "./ViewList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getOnePaymentDetails} from "../../../utils/Constants";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { useCallback } from "react";
import {useParams } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const BookingViewList = () => {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const { id: bookingId } = useParams();

  const [info, setInfo] = useState();
  const token = useSelector((state) => state.token);
  
  useEffect(() => {
    heelo();
  }, [heelo]);

  var heelo = useCallback(() => {
    axios
      .get(`${getOnePaymentDetails}/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  });
  const timestamp = info?.bookedDate;
  const dateStr = moment(timestamp).format("YYYY-MM-DD");

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">USER NAME</TableCell>
            <TableCell className="tableCell">MOVIE NAME</TableCell>
            <TableCell className="tableCell">BOOKING ID</TableCell>
            <TableCell className="tableCell">Show Date</TableCell>
            <TableCell className="tableCell">Booked Date</TableCell>
            <TableCell className="tableCell">Cinema Screen</TableCell>
            <TableCell className="tableCell">Start TIme</TableCell>
            <TableCell className="tableCell">Seats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info ? (
            <TableRow key={info.id}>
              <TableCell className="tableCell">{info.userName}</TableCell>
              <TableCell className="tableCell">{info.movieName}</TableCell>
              <TableCell className="tableCell">{info._id}</TableCell>

              <TableCell className="tableCell">{info.showDate}</TableCell>
              <TableCell className="tableCell">{dateStr}</TableCell>
              <TableCell className="tableCell">{info.cinemaScreen}</TableCell>
              <TableCell className="tableCell">{info.startAt}</TableCell>
              {info.seats.map((seat, index) => (
                <TableRow key={index}>
                  <TableCell className="tableCell">{seat.seat}</TableCell>
                </TableRow>
              ))}
              {/* <TableCell className="tableCell">{info.seats}</TableCell> */}
              <TableCell align="left"></TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="tableCell">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ToastContainer />
    </TableContainer>
  );
};

export default BookingViewList;

import React, { useEffect, useState } from "react";
import "./seatselect.css";
import FourKIcon from "@mui/icons-material/FourK";
import { useLocation } from "react-router-dom";
import userAxios from "../../../Assets/axiosForUser";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";

function Seatselect() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [coulumSeat, setCoulumSeat] = useState([]);
  const [seat, setSeat] = useState([]);
  const [seatcount, setSeatcount] = useState(0);
  const [columCount, setColumncount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [data, setData] = useState(state); // Declare data state here

  useEffect(() => {
    if (!state) navigate("/");
    else {
      setData(state);
      getBookedSeats(state);
    }
  }, [state, navigate]);

  useEffect(() => {
    const seat = Array.from({ length: seatcount }, (_, index) => index);
    setSeat(seat);

    const coulumSeat = Array.from(
      { length: columCount },
      (_, index) => String.fromCharCode(65 + index)
    );
    setCoulumSeat(coulumSeat);
  }, [seatcount, columCount]);

  const getBookedSeats = (data) => {
    userAxios
      .post("/seatusage", {
        date: data?.date,
        time: data?.time,
        screen_id: data?.Screen?.theater?.screen?._id,
      })
      .then((resp) => {
        setBookedSeats(resp?.data?.seats);
        setSeatcount(resp.data?.screenseats?.theater?.screen?.row);
        setColumncount(resp.data?.screenseats?.theater?.screen?.column);
      });
  };

  useEffect(() => {
    const updateBookedSeats = () => {
      bookedSeats.forEach((value) => {
        const element = document.getElementById(value);
        if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
          element.style.backgroundColor = "gray";
          element.disabled = true;
        }
      });
    };

    updateBookedSeats();
  }, [bookedSeats]);

  const token = localStorage.getItem("authTokens");

  function reservation(selectedSeat, data) {
    console.log("TOKEN::::-----",token);
    if (selectedSeat.length <= 0) {
      swal({
        title: "Select Seat first!",
        text: "Minimum One Seat!",
        icon: "warning",
        dangerMode: false,
      });
    }
    else {
      if (!token) {
        swal({
          title: "Log Error",
          text: "you should log in first!",
          icon: "warning",
          dangerMode: false,
        }).then(() => {
          navigate("/login");
        });
      }
      else {
        userAxios
          .post(
            "/seatbook",
            {
              BookingDate: new Date(),
              show: {
                date: new Date(data.date),
                time: data?.time,
                SeatNumber: selectedSeat,
                price: data?.Screen?.TicketPrice,
                TotalPrice: selectedSeat.length * data?.Screen?.TicketPrice,
              },
              movie: data?.Screen?.Movie,
              theater: data?.Screen?.theater,
            }
          )
          .then((resp) => {
            swal({
              title: "success",
              text: `${selectedSeat.join(", ")} Selected`,
              icon: "success",
              dangerMode: false,
            }).then(() => {
              navigate("/Checkout", {
                state: {
                  seat: selectedSeat,
                  Bookingid: resp.data._id,
                  totalprice: selectedSeat.length * data?.Screen?.TicketPrice,
                  movie: data?.Screen?.Movie,
                  theater: data?.Screen?.theater,
                  date: new Date(data?.date),
                  time: data?.time,
                  price: data?.Screen?.TicketPrice,
                },
              });
            });
          });
      }
    }
  }

  const Seatselect = (event) => {
    const selectedValue = event.target.value;
    const isSeatSelected = selectedSeat.includes(selectedValue);

    const updatedSelectedSeat = isSeatSelected
      ? selectedSeat.filter((value) => value !== selectedValue)
      : [...selectedSeat, selectedValue];

    setSelectedSeat(updatedSelectedSeat);

    const element = document.getElementById(selectedValue);
    if (element) {
      element.style.backgroundColor = isSeatSelected ? "white" : "red";
    }
  };

  return (
    <>
      <div className="Main-container bg-black">
        <div className="mainMid-container">
          <div className="Mid-container bg-black">
            <div className="seat-container bg-black">
              {coulumSeat.map((value, index) => (
                <div className="column-countainer" key={value}>
                  {seat.map((data, index) => (
                    <button
                      className={`Seat ${selectedSeat.includes(value + index) ? "selected" : ""}`}
                      value={value + index}
                      id={value + index}
                      key={value + index}
                      onClick={Seatselect}
                    >
                      {value}
                      {data}
                    </button>
                  ))}
                </div>
              ))}
              <div className="Screen-container">
                <FourKIcon sx={{ fontSize: 60 }} />
                All eyes this way
                <div className="theater"></div>
              </div>
            </div>
            <div className="mr-10 detiales-container border-2 text-white text-center">
              <div>
                <h1 className="text-white ">
                  <span className="text-[#29fadede] text-3xl ">
                    {data?.Screen?.Movie?.moviename} - {data?.Screen?.Movie?.language}
                  </span>{" "}
                </h1>
                <hr />
              </div>
              <h1 className="mt-2 text-red-500">{data?.Screen?.theater?.screen?.name}</h1>
              <h1 className="mt-4">
                {data?.date.toLocaleDateString()} - {data?.time}
              </h1>
              <h1 className="mt-3">Selected Seats</h1>
              <h1 className="mt-3">{selectedSeat.join(", ")}</h1>
              {selectedSeat.length > 0 && (
                <h2 className="mt-3 mb-3">
                  {data?.Screen?.TicketPrice} * {selectedSeat.length} ={" "}
                  {selectedSeat.length * data?.Screen?.TicketPrice}
                </h2>
              )}
              <button
                onClick={() => {
                  reservation(selectedSeat, data);
                }}
                className="bg-[#ffff] text-black px-2 rounded-lg hover:bg-[#b48d8d]"
              >
                Book Your Seat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Seatselect;





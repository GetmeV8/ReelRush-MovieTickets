import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { ToastContainer, toast } from "react-toastify";
import { otplogin,loginOtp } from "../../../utils/Constants";
import { setOtp, setTempemail,setUser,setToken } from "../../../Redux/Store";
const OtpPage = () => {
  const navigate = useNavigate();
  const [typeOtp, setTypeOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(5);
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.otp);
  const tempemail = useSelector((state) => state.tempemail);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleResendOTP = async () => {
    try {
      const values = {
        email: tempemail,
      };
  
      const { data: response } = await axios.post(loginOtp, values);
      dispatch(setOtp({ otp: response.otp }));
      dispatch(setTempemail({ tempemail: values.email }));
      setTimer(5); // Reset the timer
      toast.success("OTP sent successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
  
      // Restart the timer countdown
      let interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      // Clear the interval when the timer reaches 0
      setTimeout(() => {
        clearInterval(interval);
        setTimer(5); // Restart the timer
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  


  const handleLogin = async (e) => {
    console.log("::::::::::::::::::::deee",otp,typeOtp)
    e.preventDefault();
    if (otp == typeOtp) {
      console.log("::::::::::::::::::::deee")
      const { data } = await axios.post(`${otplogin}/${tempemail}`);
      dispatch(setUser({ user: data.user }));
      dispatch(setToken({ token: data.token }));
      setTimeout(() => {
        navigate("/");
      }, 2000);
      toast.success("OTP Login successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      // Incorrect OTP logic
      toast.error("Wrong OTP! Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleLogin}>
            <h1>Login with OTP</h1>
            <OTPInput
              value={typeOtp}
              onChange={setTypeOtp}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
            />
            <button type="submit" className={styles.green_btn}>
              Login
            </button>
            <div className={styles.timer_container}>
              {timer === 0 ? (
                <button
                  type="button"
                  className={styles.resend_btn}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              ) : (
                <span className={styles.timer}>{timer}s</span>
              )}
            </div>

          </form>
        </div>
        <div className={styles.right}></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpPage;

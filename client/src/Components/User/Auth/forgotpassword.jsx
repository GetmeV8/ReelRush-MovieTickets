import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/auth"

const ForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOTP] = useState("");
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber) {
            try {
                const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
                const confirmationResult = await firebase
                    .auth()
                    .signInWithPhoneNumber(phoneNumber, appVerifier);

                // Show OTP input
                setShowOTPInput(true);

                // Save confirmationResult for later verification
                setConfirmationResult(confirmationResult);
            } catch (error) {
                console.error("Error sending OTP:", error);
            }
        }
    };



    const handleOTPSubmit = async () => {
        try {
            const credential = await confirmationResult.confirm(otp);
            // Use the credential for further operations (e.g., password reset)
            console.log("OTP verified:", credential);

              // Redirect to the login page (home page)
              navigate("/login"); // Replace "/login" with the actual path to your login page
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };


    return (
        <>
            <section className="h-screen bg-black text-white justify-center items-center">
                <div className="container mx-auto flex justify-center items-center h-full">
                    {/* Form */}
                    <div className="md:w-3/4 lg:w-1/2 xl:w-3/5 xl:pl-10 mt-10 md:mt-0">
                        <Link to="/Home">
                            <h1 className="w-full text-3xl font-thin text-[#f8f8f8]">
                                ReelRush<sup className="text-red-700">ORG</sup>
                            </h1>
                        </Link>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 mt-6">
                                <input
                                    type="text"
                                    id="phone"
                                    className="w-full p-3 rounded-lg border text-center border-white focus:outline-none focus:border-primary-500 bg-black text-white"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            {showOTPInput && (
                                <div className="mb-4 mt-6">
                                    <input
                                        type="text"
                                        id="otp"
                                        className="w-full p-3 rounded-lg border text-center border-white focus:outline-none focus:border-primary-500 bg-black text-white"
                                        placeholder="OTP"
                                        value={otp}
                                        onChange={(e) => setOTP(e.target.value)}
                                    />
                                </div>
                            )}

                            <button
                                className="w-full p-3 rounded-lg text-xl text-white bg-red-700"
                                id="sendotp"
                                onClick={() => handleSubmit}
                            >
                                Send OTP
                            </button>
                            {showOTPInput && (
                                <button
                                    className="w-full p-3 rounded-lg text-xl text-white bg-red-700"
                                    id="verify"
                                    onClick={() => handleOTPSubmit}
                                >
                                    Confirm OTP
                                </button>
                            )}

                            <div className="text-center" id="recaptcha-container"></div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </section>

        </>

    );
};

export default ForgotPassword;

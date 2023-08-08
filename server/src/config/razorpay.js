// const dotenv = require('dotenv');
const Razorpay = require("razorpay");
const shortid = require("shortid");
YOUR_KEY_ID="rzp_test_azWhswBEhOR0eJ"
YOUR_SECRET_KEY="9fYmxxaTD4WxuUv70QlwrFew"

// Load environment variables from .env file
// dotenv.config()

const razorpay = new Razorpay({
//   key_id:process.env.YOUR_KEY_ID || YOUR_KEY_ID,
//   key_secret: process.env.YOUR_SECRET_KEY || YOUR_SECRET_KEY,
key_id:YOUR_KEY_ID,
key_secret: YOUR_SECRET_KEY
});

const createOrder = async (amount) => {
  const payment_capture = 1;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  const order = await razorpay.orders.create(options);
  return order;
};

module.exports = { createOrder };

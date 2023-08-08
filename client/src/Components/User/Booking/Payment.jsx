import React, { useState } from 'react';
import userAxios from '../../../Assets/axiosForUser';
import { useNavigate } from "react-router-dom";


function Payment(props) {
  const [amount, setAmount] = useState(props.amount);
  const [bookingid,setBookingid] =useState(props.bookingid)
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      const response = await userAxios.post('/order', { amount });
      setOrder(response.data);
    } catch (error) {
      console.error(error);
    }
};

  const onPay = () => {
    const options = {
      key: 'rzp_test_azWhswBEhOR0eJ',
      amount: order.amount,
      currency: order.currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://play-lh.googleusercontent.com/I8M0mhb7fcRfTi22XzLfeFeIcj3tiKMCQNH4YFPjqkQA8mEakWuaQrDKELo0ISuTZg',
      order_id: order.id,
      handler: function (response) {
        
        userAxios.post('/confirmPayment',{
            ...response,
            bookingid
        }).then((resp)=>{
            navigate("/");
        })
        
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);

      },
      prefill: {
        name: order.userName,
        email: order.userEmail,
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="App">
      
      <div className="App-content">
        <div className="Amount-form">
     <button id='generatepayment' className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-gray-800 hover:text-white text-white  flex flex-row justify-center items-center space-x-2 py-4 rounded w-full" onClick={()=>{
         createOrder()
     }} >Generate Payment</button>
        </div>
        {order && (
          <div className="Payment-form">
            <h2>Payment Details</h2>
            <h2>User Name: <span className='text-[#248543]'>{order.userName}</span></h2>
            <p>Amount: <span className='text-[#248543]'>{order.amount / 100}</span> {order.currency}</p>
            <button className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-gray-800 hover:text-white text-white  flex flex-row justify-center items-center space-x-2 py-4 rounded w-full" onClick={onPay}>Pay</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
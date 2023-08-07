import React, { useEffect, useState } from "react";
// import Payment from "./Payment";
import { useLocation, useNavigate } from "react-router-dom";


const ProductBillingPage = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [checkoutDetails, setDeteals] = useState(state)
    const [menu, setMenu] = useState(false);
    const [country, setCountry] = useState("United States");

    const changeText = (e) => {
        setMenu(false);
        setCountry(e.target.textContent);
    };

    useEffect(() => {
        if (!state) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        setDeteals(state)

    }, [checkoutDetails])


    return (
        <>
            <div className="flex justify-center items-center">
                <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                    <div className="flex flex-col justify-start items-start w-full space-y-9">
                        <div className="flex justify-start flex-col items-start space-y-2">
                            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-300">
                                Checkout
                            </p>
                        </div>
                        <div className="flex flex-col  xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                            <div className="flex  flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100  sm:py-0 xl:py-10 px-10 xl:w-full">
                                <h1 className="text-4xl my-4 uppercase ">{checkoutDetails?.movie?.moviename}</h1>
                                <img src={checkoutDetails?.movie?.poster1} width={300} height={300} alt="" />
                                <div className="flex  flex-col justify-start items-start w-full space-y-4">

                                    <span className="text-base font-semibold leading-none text-gray-600">
                                        <h1 className="text-xl my-4 uppercase text-center ">{checkoutDetails?.movie?.description}</h1>
                                    </span>
                                </div>
                                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                                    <img src="" />
                                </div>
                            </div>
                            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">

                                <div></div>

                                <div className="flex   flex-row justify-center items-center mt-6">
                                    <hr className="border w-full" />
                                    <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                                        Details
                                    </p>
                                    <hr className="border w-full" />
                                </div>

                                <div className="mt-8"> <span className="text-[#9a9e9b] ">Movie Name</span>

                                    <span
                                        className="border flex border-gray-300 p-4 rounded w-full leading-4 placeholder-gray-600 text-[#614917] justify-center text-xl"

                                    >{checkoutDetails?.movie?.moviename}   </span>
                                </div>
                                <div className="mt-2 flex-col"> <span className="text-[#9a9e9b] ">Theater</span>
                                    <div >
                                        <input
                                            className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-[#16572b]"
                                            disabled value={`${checkoutDetails?.theater?.name} , ${checkoutDetails?.theater?.screen.name}`}

                                        />
                                    </div>
                                    <div> <span className="text-[#9a9e9b] ">Seats</span>
                                        <input
                                            className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-[#16572b]"
                                            disabled value={checkoutDetails?.seat}
                                        />
                                    </div><span className="text-[#9a9e9b] ">Payment</span>
                                    <div className="flex-row flex mb-5 ">
                                        <input
                                            className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                            disabled value={`${checkoutDetails?.price} * ${checkoutDetails?.seat?.length}`}
                                        />
                                        <input
                                            className="border rounded-br border-gray-300 p-4 w-full text-base dfbleading-4 placeholder-gray-600 text-[#16572b]"
                                            disabled value={`${checkoutDetails?.totalprice} INR`}
                                        />
                                    </div>
                                </div>
                                {/* <Payment amount={checkoutDetails?.totalprice} bookingid={checkoutDetails?.Bookingid} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ProductBillingPage;

import React from 'react'
// import Sidebar from '../../../Components/Admin/Sidebar/sideBar';
// import Navbar from '../../../Components/Admin/Navbar';
// // cardcomponents
import Statistics from '../../../Components/Admin/Cards/statistics'
import CardLineChart from "../../../Components/Admin/Cards/cardlineChart";
import CardBarChart from "../../../Components/Admin/Cards/cardbarChart"


const MainDash = () => {
    return (
        <>
            <Statistics></Statistics>
            <div className="">
                {/* px-4 md:px-10 mx-auto w-full -m-24 */}
                <div className="flex flex-wrap">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                        <CardLineChart />
                    </div>
                    <div className="w-full xl:w-4/12 px-4">
                        <CardBarChart />
                    </div>
                </div>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                        {/* <CardPage /> */}
                    </div>
                    <div className="w-full xl:w-4/12 px-4">
                        {/* <CardSocial /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainDash

import React from "react";
import { useEffect, useState } from "react";
import axios from "../../../Assets/axiosForAdmin";

const Viewtheatres = () => {
    const [Theatres, setTheatre] = useState([]);
    const [accept, setAccept] = useState(false);


    function authorizetheatre(theatre, status, index) {
        axios.patch('/admin/accept', { ...theatre, status }).then((response) => {
            const updatedTheaters = Theatres.map((value) => {
                if (value.email === Theatres.email) {
                    return { ...value, accepted: status };
                }
                return value;
            });
            setTheatre(updatedTheaters)
        });
    }

    return (
        <>
            <div className=" flex justify-center items-center">
                <div className="relative overflow-x-auto ">
                    <table className="text-sm text-left text-white rounded-2xl">
                        <thead className="text-xs uppercase bg-gray-500 dark:bg-gray-400 text-center text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Place
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Theaters.map((theater, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                                    >
                                        {theater.email}
                                    </th>
                                    <td className="px-6 py-4 text-black font-medium">
                                        {theater.place}
                                    </td>
                                    <td className="px-6 py-4 items-center flex justify-center">
                                        {theater.accepted ? (<button
                                            type="button"
                                            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  disabled:opacity-25" disabled
                                        > ACCEPT </button>) : (<button
                                            type="button"
                                            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  "
                                            onClick={() => {
                                                authorizetheatre(theater, true, index)

                                            }
                                            }
                                        >ACCEPT </button>)}

                                        {theater.accepted ? (<button
                                            type="button"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            onClick={() => {
                                                authorizetheatre(theater, false, index)

                                            }}
                                        >
                                            REJECT
                                        </button>) : <button
                                            type="button"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-25" disabled
                                        >
                                            REJECT
                                        </button>}


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )


}

export default Viewtheatres;
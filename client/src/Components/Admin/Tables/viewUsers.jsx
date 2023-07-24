import React, { useEffect, useState } from "react";
import axios from "../../../Assets/axiosForAdmin";
import { useParams } from "react-router-dom";
import Modal from "../Modal"



const Viewuser = () => {

    const [users, setUsers] = useState([])


    const blockUser = (userid, status) => {
        axios.post('/admin/blocked',
            {
                userid: userid,
                status: status
            })
            .then((response) => {
                const { data } = response;
                console.log(data)

            })

    }
    const handleClick = (index, value) => {
        const updatedUsers = [...users];
        updatedUsers[index].isBlocked = value;
        setUsers(updatedUsers);
    }

    useEffect(() => {

        axios.get('/admin/allusers').then((resp) => {
            console.log(resp.data)
            setUsers(resp.data)
        })

    }, [])
    return (
        <>
            <div className=" flex justify-center items-center">
                {/* <h1 className="font-bold text-2xl items-center justify-center flex">
            ADD MOVIE 
          </h1> */}
                <div className="relative overflow-x-auto ">
                    <table className="text-sm text-left text-white rounded-2xl">
                        <thead className="text-xs uppercase bg-gray-500 dark:bg-gray-400 text-center text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    phonenumber
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (

                                <tr className="bg-white border-b" key={index}>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                                    >

                                        {user.email}

                                    </th>
                                    <td className="px-6 py-4 text-black text-center font-medium">{user.phone} </td>

                                    <td className="px-6 py-4 items-center flex justify-center">
                                        {user.isBlocked ? (<button
                                            type="button"
                                            className="text-white  bg-green-700 hover:bg-green-800 w-20 hover:ring-4 hover:ring-green-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            onClick={() => {
                                                blockUser(user._id, false)
                                                handleClick(index, false)

                                            }}>
                                            UnBlock
                                        </button>) : (<button
                                            type="button"
                                            className="text-white focus:ring-4  bg-red-700 hover:bg-red-800 w-20  hover:ring-red-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            onClick={() => {
                                                blockUser(user._id, true)
                                                handleClick(index, true)
                                            }}>
                                            Block
                                        </button>)}
                                        <Modal user={user} />

                                        {/* <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </button> */}
                                        {/* <button
       type="button"
       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
     >
       Delete
     </button> */}
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

export default Viewuser




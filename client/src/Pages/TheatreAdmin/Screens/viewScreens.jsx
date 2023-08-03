import React from 'react';
import { useEffect, useState } from 'react';
import CinemaAxios from "../../../Assets/axiosForCinema";
const ViewScreens = () => {
    const [screen, setScreen] = useState([])
    const token = localStorage.getItem('Cinematoken')
    const [currentPage, setCurrentPage] = useState(0)
    const [length, SetLength] = useState()
    const itemsPerPage = 5
    useEffect(() => {

        CinemaAxios.get('/theatreAdmin/view-screen').then((resp) => {
            setScreen(resp.data.screens)
            SetLength(resp.data.screens.length)
            // console.log(resp.data.screens)


        }).catch((err) => {
            console.log(err);
        })

    }, [])
    function getCurrentPageData() {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return screen.slice(startIndex, endIndex);
    }

    const handleDelete = (screenId) => {
        // Make an API call to delete the screen
        CinemaAxios.delete(`/theatreAdmin/view-screen/${screenId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header with the token
          },
        })
          .then((resp) => {
            // Handle successful deletion
            console.log('Screen deleted successfully!');
            // Update the component state by removing the deleted screen from the array
            setScreen((prevScreens) => prevScreens.filter((s) => s._id !== screenId));
          })
          .catch((err) => {
            // Handle error if any
            console.log('Error deleting screen:', err);
          });
      };
    




    return (
        <div className="h-full min-h-screen pb-4 w-full p-0 m-0 flex justify-center items-center bg-white">
            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-sm bg-white rounded-2xl overflow-hidden">
                    <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Screen Name
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Screen Type
                            </th>

                            <th scope="col" className="px-6 py-3 font-medium">
                                Row Count
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Column Count
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Total Capacity
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {getCurrentPageData().map((s) => (
                            <tr
                                key={s._id}
                            >
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                >
                                    {s.name}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black  whitespace-nowrap"
                                >
                                    {s.screen_type}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black  whitespace-nowrap"
                                >
                                    {s.row}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black  whitespace-nowrap"
                                >
                                    {s.column}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black  whitespace-nowrap"
                                >
                                    {s.seating_capacity}
                                </td>
                                <td className="px-6 py-4 items-center flex justify-center gap-4">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                                    >
                                        Block
                                    </button>
                                    {/* edit */}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(s._id)}
                                        className="text-white bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             
            </div>
        </div>
    )

}
export default ViewScreens;
import React, { useEffect, useState } from 'react'
import Moviename from '../../../Components/User/MovieName/Moviename';
// import NavBar from '../../../Components/User/NavBar'
import TabPanel from '../../../Components/User/DatePicker/DatePicker';
import AvailableTheatre from '../../../Components/User/AvailableTheatre/AvailableTheatre';
import UserAxios from '../../../Assets/axiosForUser';
import { useParams } from 'react-router-dom'

function BookingPage() {
    const [show, setShow] = useState('')
    const { MovieId } = useParams()
    const [bookingDate, setBookingDate] = useState(new Date())

    function currentDate(value) {
        setBookingDate(value)
    }
    useEffect(() => {
        UserAxios.get(`/findShow/${MovieId}`).then((resp) => {
            setShow(resp.data)
        })
    }, [])

    return (

        <div>
            <Moviename data={show} />
            <TabPanel data={show} fn={currentDate} />
            <AvailableTheatre data={show} date={bookingDate} />

        </div>
    )
}

export default BookingPage

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "../../../Assets/axiosForAdmin";
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [errors, setErrors] = useState('')
    const [token, setTocken] = useState(null)
    const navigate = useNavigate();
    const [logData, setLogData] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        const Admintoken = localStorage.getItem("Admintoken");
        if (Admintoken) {
            console.log(Admintoken);
            navigate('/dashboard')
        }
    },[])

    const loginHandle = (event) => {
        const { value, id } = event.target;
        setLogData({ ...logData, [id]: value })
    }

    const logApiCall = () => {
        axios.post('/admin/login', { ...logData }).then((res) => {
            console.log(logData)
            navigate('/dashboard')
            setTocken(res.data.token)
            localStorage.setItem("Admintoken", res.data.token);
            if (token) {
                navigate('/dashboard')
            }
        }).catch((err) => {

            setErrors(err.response.data.error)
            setTimeout(() => {
                setErrors('')
            }, 2000);

        })

    }

    return (
        <div className="flex justify-center  h-[40rem] ">

            <div className="flex flex-col justify-center  w-full max-w-md px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}>

                    <h2 className="text-2xl font-black mb-4 text-center"><span className="text-[#050705]">Admin</span> Login</h2>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-red-500"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={loginHandle}
                            value={logData.email}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-red-500"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={loginHandle}
                            value={logData.password}
                            required
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-lg font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        type="submit"
                        onClick={() => {
                            logApiCall()
                        }}>
                        Log in
                    </button>
                    <p className="text-[#f50e0e]">{errors}</p>
                </form>
                <p className="mt-4 text-gray-600 text-center">
                    Public account?{" "}
                    <Link to={'/'}> <button
                        className="text-red-500 hover:text-red-700 font-bold focus:outline-none"
                        onClick={() => { }}>
                        Login here.
                    </button></Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

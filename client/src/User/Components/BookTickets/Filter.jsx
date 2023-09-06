import React from "react";
import { Calendar } from "./Calendar";

import {useParams } from "react-router-dom";

export const Filter = () => {
    let { id: movieId } = useParams();
    return (
        <div style={{marginTop:"5px",  width:"300px",borderRadius:"50px",boxShadow:"1px 1px 1px 2px rgba(237, 228, 228, 0.949)",color:"white",backgroundColor: "black", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 7.5%" }}>
            <Calendar moviId={movieId}/>
        </div>
    )
}

;
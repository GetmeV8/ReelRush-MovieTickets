import React from "react";
import { Calendar } from "./Calendar";

import {useParams } from "react-router-dom";

export const Filter = () => {
    let { id: movieId } = useParams();
    return (
        <div style={{width:"300px",borderRadius:"20px",boxShadow:"1px 1px 1px 2px rgba(237, 228, 228, 0.949)",color:"white",backgroundColor: "rgb(87,168,204)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 7.5%" }}>
            <Calendar moviId={movieId}/>
        </div>
    )
}

;
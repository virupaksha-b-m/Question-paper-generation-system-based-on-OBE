import React from 'react'
import { useNavigate } from "react-router-dom"
import Navbar from './navbar'
import { useLocation } from "react-router-dom";



const ViewCode = () => {

    const navigate = useNavigate();
    let {state} = useLocation();
    

    return (
       
        <div className='container-fluid'>
            <Navbar />
            <div className="container uploadQuestion">
               <h5>{state.course._id}</h5>
               <h5>{state.course.code}</h5>
               <h5>{state.unit}</h5>
               
            </div>
        </div>
        
    )
}

export default ViewCode;
import React from 'react'
import '../styles/homepage.css'
import { useNavigate } from "react-router-dom"
import Navbar from './navbar'
// import { useLocation } from "react-router-dom";
import SetPaperFormat from './adminControl/setPaperFormat';



const Homepage = ({ updateUser }) => {

    const navigate = useNavigate();
    const user = window.localStorage.getItem("username");
    // let {state} = useLocation();
    // console.log(state.user);


    return (
        <div className='container-fluid'>
            <Navbar />

            <div className="homepage ">
                <div className='text-center text-white'>
                    <h4>STEP 1</h4>
                    <div className='category'>
                        <h1>Upload Question</h1>
                        <p>Add new Questions to the Question Bank.</p>
                        <button type="button" className="btn btn-danger btn-lg w-75 " onClick={() => navigate('/uploadQuestion')}>Upload </button>
                    </div>
                </div>
                <div className='text-center text-white'>
                <h4>STEP 2</h4>
                <div className='category'>
                    <h1>Set Paper Format</h1>
                    <p>Set question format for paper setter.</p>
                    <button type="button" className="btn btn-danger btn-lg w-75" data-bs-toggle="modal" data-bs-target="#setPaperFormat">Set Paper Format</button>
                </div>
                </div>
                <div className='text-center text-white'>
                    <h4>STEP 3</h4>
                <div className='category'>
                    <h1>Generate Paper</h1>
                    <p>Get your question paper ready within minutes.</p>
                    <button type="button" className="btn btn-danger btn-lg w-75 " onClick={() => navigate('/generate')}>Generate</button>
                </div>
                </div>
                <SetPaperFormat />

            </div>
        </div>
    )
}

export default Homepage;
import React from 'react'
import '../styles/navbar.css'
import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate()
    const user = window.localStorage.getItem("username");



    const logOut = () => {
       window.localStorage.clear();
       navigate('/' , { replace: true })
    }

    return (
        <div className='container-fluid navigationbar fixed-top'>
            <nav className="mt-2 navbar-expand-lg bg-body-tertiary">
                {/* <div className="container-fluid ">      */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/homepage">Home</a>
                        </li> 
                        {/* <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/viewCode">Code Format</a>
                        </li>      */}
                    </ul>
                    <div className="d-flex flex-row mb-2" >
                        <p className='m-3'>{user}</p>
                        <button className="btn btn-outline-success btn-nav mt-2 h-50" onClick={logOut} >Logout</button>
                    </div>
                    </div>
                {/* </div> */}
            </nav>
         </div>
    )
}

export default Navbar;
import React from 'react'
import "../styles/admin.css"
import AddFaculty from './adminControl/addFaculty'
// import AddUser from './adminControl/addUser'
import Program from './adminControl/addProgram'
import AddDepartment from './adminControl/addDepartment'
import AddCourse from './adminControl/addCourse'
import AddChapter from './adminControl/addChapter'
// import SetPaperFormat from './adminControl/setPaperFormat'

// import axios from "axios"
import { useNavigate } from "react-router-dom"

const Admin = () => {
    const navigate = useNavigate();

    
    const logOut = () => {
        window.localStorage.clear();
        navigate('/' , { replace: true })
     }

    return (
        <div className="container-fluid">
            <header>
                <h1 className="admin-header">Admin</h1>                         
                <button className="btn btn-outline-success btn-nav h-50 me-4 float-end" onClick={logOut} >Logout</button>

                <nav>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal"  data-bs-target="#addProgram">Add Program</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal"  data-bs-target="#addDepartment">Add Department</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal"  data-bs-target="#addCourse">Add Course</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal"  data-bs-target="#addChapter">Add Chapter</button>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addFaculty" >Add Faculty</button>
                        <button class="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">View Database</button>
                    </div>
                </nav>
                
            </header>
            <div className="container-fluid admin-bg">
                 <AddFaculty />
                 <Program />
                 <AddDepartment />
                 <AddCourse />
                 <AddChapter />
                 
            </div>
            
            <div className="offcanvas offcanvas-end " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header bg-warning">
                    <h2 id="offcanvasRightLabel" >Database Information</h2>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="d-flex flex-column bg-dark offcanvas-body justify-content-center ">
                <button type="button" className="btn btn-primary border border-warning" onClick={()=>navigate('/viewFaculty')}>View Faculty</button>
                <button type="button" className="btn btn-primary mt-3 border border-warning" onClick={()=>navigate('/viewProgram')}>View Program</button>
                <button type="button" className="btn btn-primary mt-3 border border-warning" onClick={()=>navigate('/viewDepartment')}>View Department</button>
                <button type="button" className="btn btn-primary mt-3 border border-warning" onClick={()=>navigate('/viewCourse')}>View Course</button>
                <button type="button" className="btn btn-primary mt-3 border border-warning" onClick={()=>navigate('/viewChapter')}>View Chapter</button>
                {/* <button type="button" className="btn btn-primary mt-3 border border-warning" onClick={()=>navigate('/viewChapter')}>View Semester Course</button> */}

                </div>
            </div>
        </div>
    )
}

export default Admin

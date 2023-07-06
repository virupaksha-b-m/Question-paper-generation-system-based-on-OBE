// import logo from './logo.svg';
import React, {useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom"

import './App.css';
import Login from './components/login';
// import Register from './components/register';
import Homepage from './components/homepage';
// import Navbar from './components/navbar';
import UploadQuestion from './components/uploadQuestion';
import Admin from './components/admin';
import Generate from './components/generate';
// import AddUser from './components/adminControl/addUser';
import PaperLayout from './components/paperLayout';
// import AddFaculty from './components/adminControl/addFaculty';

import ViewChapter from './components/adminControl/viewChapter';
import ViewFaculty from './components/adminControl/viewFaculty';
import ViewCode from './components/viewCode';
import ViewProgram from './components/adminControl/viewProgram';
import ViewDepartment from './components/adminControl/viewDepartment';
import ViewCourse from './components/adminControl/viewCourse';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {


  const [loginUser, setLoginUser] = useState(false);


  useEffect(() => {
    setLoginUser(window.localStorage.getItem("loggedIn"));
  }, []);

  return (
    <div className="App">
      
      <Router>
        <Routes>

          <Route path = "/" element={ <Login />} />
          {/* <Route path = "/login" element={ <Login /> } /> */}
          <Route path = "/admin" element={<Admin />} />
          {/* <Route path = "/addUser" element={<AddFaculty />} /> */}
          {/* <Route path = "/register" element={<Register/>} /> */}
           (loginUser) ? 
            <>
            <Route path = "/homepage" element = { <Homepage />  } /> 
            <Route path = "/uploadQuestion" element={ <UploadQuestion/> } />
            <Route path = "/generate" element={ <Generate/> }/>
            <Route path = "/paperLayout" element={<PaperLayout/> }/>
            <Route path = "/viewChapter" element={ <ViewChapter/>} />
            <Route path = "/viewFaculty" element={ <ViewFaculty/>} />
            <Route path = "/viewCode" element={ <ViewCode/>} />
            <Route path = "/viewProgram" element={ <ViewProgram/>} />
            <Route path = "/viewDepartment" element={ <ViewDepartment/>} />
            <Route path = "/viewCourse" element={ <ViewCourse/>} />

            </> : null
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;

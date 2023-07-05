import React, { useState } from "react"
import "../styles/login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import Homepage from './homepage';
// import { Link } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()
    // const [loginUser, setLoginUser] = useState();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user;
        if (email && password) {
            axios.post("http://localhost:9002/login", user)
                .then(res => {
                    // alert(res.data.message)
                    if (res.data.message === "Login succesfull") {

                        window.localStorage.setItem("loggedIn", true);
                        window.localStorage.setItem("username", email);
                        // navigate('/', { state: { user: email } ,replace:true });

                        if(res.data.user.isAdmin === true){
                            navigate('/admin', { replace: true });
                        }
                        else navigate('/homepage', { state: { user: email }, replace: true });
                        // setLoginUser(res.data.user)
                        // console.log(res.data.user)

                    }
                    else alert(res.data.message)
                })
        } else alert("Invalid Input")
        
    }

    return (
        <div className="loginBg container-fluid  bg-dark">
            <div className="container login   text-white " >
                {console.log(user)}
                <h1>Login </h1>
                <input type="text" name="email" value={user.name} placeholder="Enter email" onChange={handleChange}></input>
                <input type="password" name="password" value={user.password} placeholder="Enter password" onChange={handleChange}></input>
                <div className="button" onClick={login}>Login</div>

                {/* <div>or</div> */}
                {/* <div className="button" onClick={()=>navigate("/register")}>Register</div> */}
            </div>
        </div>
    )
}

export default Login
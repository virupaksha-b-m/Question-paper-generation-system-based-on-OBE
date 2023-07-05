import React, {useState} from 'react'
import '../styles/register.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e =>{
        const {name, value} = e.target
        // console.log(name, value)
        setUser({
            ...user, //spread operator
            [name] : value
        })
    } 

    const register = () => {
        
        const {name, email, password, reEnterPassword } = user
        if( name && email && password && (password ===reEnterPassword)){
            // alert("posted")
            axios.post("http://localhost:9002/register", user)
            .then(res => alert(res.data.message))
            // .then())
        } else {
            alert('Invalid input')
        }
        
    }

    return (
        <div className="register">
            {console.log("user", user)}
           <h1>Register</h1>
           <input type="text" name="name" value={user.name} placeholder="Enter your name" onChange={handleChange}></input>
           <input type="text" name="email" value={user.email} placeholder="Enter your email" onChange={handleChange}></input>
           <input type="password" name="password" value={user.password} placeholder="Enter your password" onChange={handleChange}></input>
           <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter your password" onChange={handleChange}></input>
            <div className="button" onClick={register}>Register</div>
            {/* <div>or</div> */}
            {/* <div className="button"onClick={()=>navigate("/login")}>Login</div> */}
        </div>
    )
}

export default Register;
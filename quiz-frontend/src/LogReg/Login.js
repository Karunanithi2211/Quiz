import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import './Common.css'
import Cookies from 'js-cookie'

const Login = () => {
    const [registered, setSuccessreg] = useState(false)
    const [logout, setlogout] = useState(false)
    const [unf, setUnf] = useState(false)
    const [pic, setPic] = useState(false)
    const [lif, setLif] = useState(false)
    useEffect(()=>{
        if(window.location.href.includes("/?reg")){
            setSuccessreg(true);
        }
        if(window.location.href.includes("/?logout")){
            setlogout(true);
        }
        if(window.location.href.includes("/?unf")){
            setUnf(true);
        }
        if(window.location.href.includes("/?pic")){
            setPic(true);
        }
        if(window.location.href.includes("/?lif")){
            setLif(true);
        }
    })

    const [Userdata, setUserdata] = useState({
        email:"",
        password:"",
    })

    const handleChange = (e) =>{
        setUserdata({...Userdata,[e.target.name] : e.target.value})
    }

    const accoutLogin= async (e) =>{
        e.preventDefault();
        const datas = Userdata
        var emailToCheck = Userdata["email"]
        const response = await api.get('/quiz/all');
        const data = response.data;
        const emailExists = data.some((item) => item.email === emailToCheck);

        if (emailExists){
            const userinfo = await api.get('/quiz/user/'+ emailToCheck)
            const users = userinfo.data
            const inputpwd = users?.password
            if(inputpwd == Userdata["password"]){
                Cookies.set("userId", emailToCheck)
                window.location.href = 'http://localhost:3000/home'
            }
            else{
                window.location.href = 'http://localhost:3000/?pic'
            }
        }   
        else{
            window.location.href = 'http://localhost:3000/?unf'
        }
    }



  return (
    <div className='body'>
        <nav class="navbar fixed-top bg-success navbar-dark navbar-expand-sm">
            <div class="container">
                <div class="navbar-brand">Quiz</div>
                <ul class="navbar-nav ml-auto">
                    <li><a href="/" class="nav-link active" id="loglink">Login</a></li>
                    <li><a href="/register" class="nav-link" id="reglink">Register</a></li>
                </ul>
            </div>
        </nav>
        <div class="login" id="login">
            <form onSubmit={accoutLogin} autoComplete='off' autoFocus>
                <div className='loginpage'>
                <h1>Login</h1>

                <label>Email  {unf && <p style={{color:"red"}} className='inlinemessage'>*User not found</p>}</label>
                <input type="text" name="email" id="email" value={Userdata.email} onChange={handleChange} required/>

                <label>Password {pic && <p style={{color:"red"}} className='inlinemessage'>*Incorrect Password</p>}</label>
                <input type="password" name="password" id="password" value={Userdata.password} onChange={handleChange} required/>

                <button type="submit">Login</button>
                </div>
            </form> 
            <div className='messages'>
                <center>
                {registered && <p style={{color:"green"}} className='message'>Successfully Registered</p>}
                {logout && <p style={{color:"green"}} className='message'>Successfully Logged Out</p>}
                {lif && <p style={{color:"yellow"}} className='message'>Login First</p>}
                </center>
            </div>
        </div>
    </div>
  )
}

export default Login
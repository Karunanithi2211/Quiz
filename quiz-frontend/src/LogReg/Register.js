import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import "./Common.css"

const Register = () => {

    const [userexist, setuserexist] = useState(false)
    useEffect(()=>{
        if(window.location.href.includes("/register?userexist")){
            setuserexist(true);
        }
    })

    const [selectedgender, setSelectedGender] = useState('male');

    const handleOptionChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const [Userdatas, setUserdata] = useState({
        username:"",
        email:"",
        password:"",
    })

    const handleChange = (e) =>{
        setUserdata({...Userdatas,[e.target.name] : e.target.value})
    }

    const register= async (e) =>{
        e.preventDefault();
        const datas = Userdatas
        var emailToCheck = Userdatas["email"]
        const response = await api.get('/quiz/all');
        const data = response.data;
        const emailExists = data.some((item) => item.email === emailToCheck);
        
        if (emailExists){
            window.location.href = 'http://localhost:3000/register?userexist' 
        }
        else{
            try {
                const Userdata = {
                        username:Userdatas["username"],
                        gender:selectedgender,
                        email:Userdatas["email"],
                        password:password
                }
                await api.post('/quiz/register',[Userdata]);
                window.location.href = 'http://localhost:3000/?reg'
            } catch (error) {
                console.log(error)
                window.location.href = 'http://localhost:3000/register'
            }
        }
    }

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const Button = document.getElementById("myButton")
    
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        const pwd = document.getElementById("pwdlength")
        pwd.style.display = "block"
        setPassword(newPassword);

        if (newPassword.length >= 6) {
            Button.disabled = false;
            Button.style.cursor = "pointer"
            pwd.style.display = "none"
            setIsPasswordValid(true);
        } else {
            Button.disabled = true;
            Button.style.cursor = "not-allowed"
            setIsPasswordValid(false);
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const confi = document.getElementById("matchpwd")
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        confi.style.display = "block"

        if (password === newConfirmPassword) {
            Button.disabled = false;
            Button.style.cursor = "pointer"
            confi.style.display = "none"
            setPasswordMatch(true);
        } else {
            Button.disabled = true;
            Button.style.cursor = "not-allowed"
            setPasswordMatch(false);
        }
    };


   


  return (
    <div className='body'>
        <nav class="navbar fixed-top bg-success navbar-dark navbar-expand-sm">
            <div class="container">
                <div class="navbar-brand">Quiz</div>
                <ul class="navbar-nav ml-auto">
                    <li><a href="/" class="nav-link" id="loglink">Login</a></li>
                    <li><a href="/register" class="nav-link active" id="reglink">Register</a></li>
                </ul>
            </div>
        </nav>
        <div class="Register" id="Register">
            <form onSubmit={register} autoComplete='off' autoFocus>
                <h1>Register</h1>
                
                <div className='input-name'>
                    <label>Name</label>
                    <input type="text" name="username" id="username" value={Userdatas.username} onChange={handleChange} required/>
                    <select className='input-gender' value={selectedgender} onChange={handleOptionChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <label>Email</label>{userexist && <span style={{color:"red"}} className='inline-message'>*!Oops User already exists</span>}
                <input type="text" name="email" id="email" value={Userdatas.email} onChange={handleChange} required/>

                <label>Password </label>
                <div id="pwdlength" style={{ color: isPasswordValid ? 'green' : 'yellow', display:"none" }} className='pwd'>
                    {isPasswordValid
                    ? 'Password is valid'
                    : 'Password must contain at least 6 characters'}
                </div>
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} required/>

                <label>Confirm Password</label>
                <div id="matchpwd" style={{ color: passwordMatch ? 'green' : 'red', display: "none" }} className='confipwd'>
                    {passwordMatch ? 'Passwords match' : 'Passwords do not match'}
                </div>
                <input type="password" name="confipassword" id="confipassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required/>

                <button type="submit" id='myButton'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register
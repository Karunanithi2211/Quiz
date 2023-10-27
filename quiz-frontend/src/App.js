
import './App.css';
import Login from './LogReg/Login';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Register from './LogReg/Register';
import Home from './Home/Home';
import { useEffect, useState } from 'react';
import api from './api/axiosConfig'
import Profile from './Profile/Profile';

function App() {
  const [questions,setQuestions] = useState()

  const getQuestions = async() => {
    try{
      const response = await api.get("/quiz/question")
      setQuestions(response.data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getQuestions();
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home  questions={questions}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

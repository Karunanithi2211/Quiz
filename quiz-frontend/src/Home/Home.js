import React, { useEffect, useState } from 'react'
import './Home.css'
import Cookies from 'js-cookie';
import api from '../api/axiosConfig'

const Home = ({questions}) => {

  const [userId,setUserId] = useState()

  //to check authenticated
  const isAuthenticated=()=>{
    const userId= Cookies.get('userId');
    setUserId(userId)
    if (userId =="undefined") {
      window.location.href='http://localhost:3000/?lif';
    }
    else {
      const setPersistentCookie = (name, value) => {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
      };
      setPersistentCookie("userId",userId)
      console.log("user is authenticated")
    }
  }


  const pageSize = 10; //the number of questions per page

  // Render questions for the current page
  const renderQuestions = () => {
    var questionCounter=1
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
      
    return quizQuestions?.slice(startIndex, endIndex).map((question, questionIndex) =>{
      const globalQuestionIndex = startIndex + questionIndex + questionCounter;
      return (
        <div className='content'>
          <div>
            <div key={questionIndex} className='quiz'>
              <ul className='quiz-container'>
                <div className='questionno'> Question: {globalQuestionIndex}</div>
                <div className='question-container'>
                  <span className='question'>{question.question}</span>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <label className={`containers ${submitted && optionIndex === selectedOptions[startIndex + questionIndex] && option === question.answer ? 'correct' : (submitted && optionIndex === selectedOptions[startIndex + questionIndex] && option !== question.answer ? 'incorrect' : '')}`}>
                        {option}
                        <input
                          type="radio"
                          id={`radio-option-${startIndex + questionIndex}-${optionIndex}`}
                          name={`question-${startIndex + questionIndex}`}
                          value={option}
                          onChange={() => handleOptionChange(startIndex + questionIndex, optionIndex)}
                          checked={selectedOptions[startIndex + questionIndex] === optionIndex}
                        />
                        <span className='checkmark'></span>
                      </label>
                    </li>
                  ))}
                  <div>
                    <br/>
                  </div>
                  {ans && (
                    <div className='answers-container'>
                      <div className='answers'>Answer:</div>
                      <div className='answer'>{question.answer}</div>
                    </div>
                  )}
                </div>
              </ul>
            </div>
            <br/>
          </div>
          <br/>
        </div>
      )});
  };
  

  //pagechange
  const [currentPage, setCurrentPage] = useState(1);
  const [quizQuestions, setQuestions] = useState();
  const totalQuestions = quizQuestions?.length;
  const totalPages = Math.ceil(totalQuestions / pageSize);
  
  // caluculations
  const [selectedOptions, setSelectedOptions] = useState(Array(quizQuestions?.length).fill(null));
  const [score, setScore] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const handleOptionChange = (questionIndex, optionIndex) => {
    if (!submitted) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[questionIndex] = optionIndex;
      setSelectedOptions(newSelectedOptions);
    }
  };

  const [ans, setAns] = useState(false)


  const calculateScore = async () => {
    setAns(true)
    setSubmitted(true);
    let totalScore = 0;
    quizQuestions?.forEach((question, questionIndex) => {
      if (selectedOptions[questionIndex] !== null) {
        const selectedOption = question.options[selectedOptions[questionIndex]];
        if (selectedOption === question.answer) {
          totalScore++;
        }
      }

    
    });
    setScore(totalScore);

    const datetime = new Date()
    const datetimes = datetime.toLocaleString()

    const Userdata = {
      email:userId,
      date:datetimes,
      score:totalScore
    }
    await api.post('/quiz/profile',[Userdata]);


  };

  const serialNumbers=(startingSerial) => {
    const ulElements = document.querySelectorAll('ul');
    var serial = startingSerial;
    ulElements.forEach((ul) => {
      ul.style.counterReset = 'serial ' + serial;
      serial++;
    });
  }

  //logout
  const logOut = () => {
    const removeCookie = (name) => {
        const expirationDate = new Date(0);
        document.cookie = `${name}=; expires=${expirationDate.toUTCString()}; path=/`;
    };
    removeCookie('userId');
    localStorage.removeItem('shuffledQuestions');
    window.location.href = 'http://localhost:3000/?logout'
  };

  //score
  const on=() =>{
    calculateScore()
    document.getElementById("overlay").style.display = "block";
  }
  
  const off =() =>{
    document.getElementById("overlay").style.display = "none";
  }

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };
    
    if (questions && questions.length > 0) {
      const shuffledQuestions = JSON.parse(localStorage.getItem('shuffledQuestions')) || shuffleArray(questions);
      localStorage.setItem('shuffledQuestions', JSON.stringify(shuffledQuestions));
      isAuthenticated();
      setQuestions(shuffledQuestions);
      serialNumbers(0);
    }
  }, [questions]);

  const isLastPage = currentPage === totalPages;

  return (
    <div className='home'>
        <nav class="navbar fixed-top bg-success navbar-dark navbar-expand-sm">
            <div class="container">
                <div class="navbar-brand">Quiz</div>
                <ul class="navbar-nav ml-auto">
                    <li><a href="/profile" class="nav-link" id="loglink">Profile</a></li>
                    <li><a href="#" class="nav-link" id="reglink" onClick={logOut}>Logout</a></li>
                </ul>
            </div>
        </nav>
        <div className='container'>
          {renderQuestions()}
          {isLastPage && (
            <div className='submit-button-container'>
              <button onClick={on} className='button'>
                Submit
              </button>
              <br/>
            </div>
          )}
          <div className='pages'>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(quizQuestions?.length / pageSize) }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div id="overlay" onDoubleClick={off}>
            <div id="text">{score !== (0 || null) && <p>Your score: {score}</p>}</div>
          </div>
        </div>
    </div>
  )
}
export default Home;
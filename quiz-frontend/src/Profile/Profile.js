import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import './Profile.css'
import api from '../api/axiosConfig'
import men from './men.png'
import women from './women.png'
import otherimg from './other.png'

const Profile = () => {

    const [userId, setUserId] = useState()
    const [profiledata, setProfileData] = useState()
    const [profilecontent, setProfileContent] = useState()
    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    const [other, setOther] = useState(false)

    const isAuthenticated = () => {
        const userId = Cookies.get('userId');
        setUserId(userId)
        profileDetails(userId)
        if ((userId == "undefined") || (!userId)) {
            window.location.href = 'http://localhost:3000/?lif';
        }
        else {
            console.log("user is authenticated")
        }
    }

    const logOut = () => {
        const removeCookie = (name) => {
            const expirationDate = new Date(0);
            document.cookie = `${name}=; expires=${expirationDate.toUTCString()}; path=/`;
        };
        removeCookie('userId');
        localStorage.removeItem('shuffledQuestions');
        window.location.href = 'http://localhost:3000/?logout'
    };

    const homePage = () => {
        localStorage.removeItem('shuffledQuestions');
    }

    const profileDetails = async (email) => {
        const content = await api.get('/quiz/profile/' + email)
        const profile = await api.get('/quiz/user/' + email)
        const profiledata = profile.data
        const profilecontent = content.data
        setProfileData(profiledata)
        setProfileContent(profilecontent)
        if (profiledata?.gender == 'male') {
            setMale(true)
        }
        else if (profiledata?.gender == 'female') {
            setFemale(true)
        }
        else {
            setOther(true)
        }
    }

    const datetime = new Date()
    const datetimes = datetime.toLocaleString()
    useEffect(() => {
        isAuthenticated()
    }, [])

    return (
        <div className='profile'>
            <nav class="navbar fixed-top bg-success navbar-dark navbar-expand-sm">
                <div class="container">
                    <div class="navbar-brand">Quiz</div>
                    <ul class="navbar-nav ml-auto">
                        <li><a href="/home" class="nav-link" id="loglink" onClick={homePage}>Home</a></li>
                        <li><a href="#" class="nav-link" id="reglink" onClick={logOut}>Logout</a></li>
                    </ul>
                </div>
            </nav>
            <div>
                <div className='center'>
                    {male && <img src={men} alt="men" />}
                    {female && <img src={women} alt="men" />}
                    {other && <img src={otherimg} alt="men" />}
                    <br />
                    <h1>{profiledata?.username}</h1>
                </div>
                <div className='profile-detail-quiz'>
                    <div>
                        {profilecontent?.length > 0 ? ( // Check if dataList has data
                            <table className='profile-details'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <br />
                                <tbody>
                                    {profilecontent?.map((data) => (
                                        <tr style={{ borderBottom: '1px dotted white' }}>
                                            <td>{data.date}</td>
                                            <td>{data.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <center>
                                <p>No Scores yet</p>
                            </center>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
import React, { Fragment, useEffect, useState } from 'react'
import Logout from '../User/Logout/Logout'
import Quiz from '../Quiz/Quiz'
import { auth } from '../Firebase/configFirebase'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const [userSession, setUserSession] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserSession(user)
      } else {
        // setInterval(() => {
          navigate('/')
        // }, 2000);
      }
    })
    return () => {
      checkAuth()
    }
  })
  

  // console.log(auth.currentUser);

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
    </Fragment>
  ) : (
    <div className="quiz-bg">
        <div className="container">
          <Logout/>
          <Quiz/>
            Welcome
        </div>
    </div>
  )
}

export default Welcome
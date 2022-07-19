import React, { Fragment, useEffect, useState } from 'react'
import Logout from '../User/Logout/Logout'
import Quiz from '../Quiz/Quiz'
import { auth, user } from '../Firebase/configFirebase'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore'

const Welcome = () => {

  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()


  useEffect(() => {
    // vérifier compte existant
    const checkAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user)
      } else {
        // setInterval(() => {
        navigate('/')
        // }, 2000);
      }
      // console.log(auth.currentUser.providerData)
    })
    // si compte existant, récupération des data depuis la DB Firebase
    if (!!userSession) {
      const colRef = user(userSession.uid)
      getDoc(colRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const docData = snapshot.data()
            console.log(docData)
            setUserData(docData)
          }
        })
        .catch(error => {
          console.log(error)
        })

    }
    return () => {
      checkAuth()
    }
  }, [userSession])


  // console.log(auth.currentUser);

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData}/>

      </div>
    </div>
  )
}

export default Welcome
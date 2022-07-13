import React from 'react'
import Logout from '../User/Logout/Logout'
import Quiz from '../Quiz/Quiz'

const Welcome = () => {
  return (
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
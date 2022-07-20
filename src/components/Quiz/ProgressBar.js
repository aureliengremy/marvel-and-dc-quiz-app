import React, { Fragment } from 'react'

const ProgressBar = ({questionId, maxQuestion}) => {

  // console.log(questionId, maxQuestion)
  const getWidth = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId
  }

  const actualQuestion = questionId +1
  const percentProgress = getWidth(maxQuestion,actualQuestion)

  // console.log(percentProgress)
  return (

    <Fragment>
    <div className="percentage">
      <div className="progressPercent">
        {`Question: ${actualQuestion}/${maxQuestion}`}
      </div>
      <div className="progressPercent">
        {`Progression: ${percentProgress}%`}
      </div>
    </div>
    <div className="progressBar">
      <div className="progressBarChange" style={{width: `${percentProgress}%`}}></div>
    </div>
    </Fragment>
  )
}
// pour ne pas recharger le composent pour rien - si questionId, maxQuestion ne change pas
export default React.memo(ProgressBar)
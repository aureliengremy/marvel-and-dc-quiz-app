import React, { Fragment, useEffect, useState } from 'react'

const QuizOver = React.forwardRef((props, ref) => {
    // console.log(props)
    // console.log(ref)

    const {
        levelName, 
        percent, 
        score, 
        maxQuestion, 
        quizLevelSelect,
        loadLevelQuestion
    } 
    = props;

    const [asked, setAsked] = useState([])

    // console.log(asked)

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const averageScore = maxQuestion / 2

    if(score < averageScore) {
        setTimeout(() => {
            loadLevelQuestion(quizLevelSelect)
        },5000)
    }

    const decision = score >= averageScore ? (
        <Fragment>
            <div className="stepsBtnContainer">

            {
                quizLevelSelect < levelName.length ? (
                    <Fragment>
                        <p className="successMsg">Bravo, passez au niveau suivant !</p>
                        <button className="btnResult success" onClick={() => loadLevelQuestion(quizLevelSelect)}>Niveau suivant</button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p className="successMsg">Bravo, vous êtes un expert !</p>
                        <button className="btnResult info" onClick={() => loadLevelQuestion(0)}>Acceuil</button>
                    </Fragment>
                )    
            }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestion}</div>
            </div>
        </Fragment>
        ) : (
        <Fragment>
             <div className="stepsBtnContainer">
                <p className="failureMsg">Dommage, vous n'avez pas ce qu'il faut !</p>
             </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestion}</div>
            </div>
        </Fragment>
        )


    
    const questionAnswer = score >= averageScore ? (
        
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className="btnInfo">Infos</button>
                    </td>
                </tr>
            )
        })
    ) : (
        <tr >
            <td colSpan="3">
                <div className="loader"></div>
                <p style={{textAlign: 'center', color: 'red'}}>
                    Pas de réponses!
                </p>
            </td>
        </tr>
    )



    return (
        <Fragment>
            {decision}   
            <hr />
            <p>Les réponses aux question posées: </p>
            <div className="answerContianer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
        </Fragment>

    )
})

export default React.memo(QuizOver)
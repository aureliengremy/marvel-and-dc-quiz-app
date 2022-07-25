import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup, GiPodiumWinner } from 'react-icons/gi'
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';


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
    const [openModal, setOpenModal] = useState(false)

    // console.log(asked)

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const averageScore = maxQuestion / 2

    if (score < averageScore) {
        setTimeout(() => {
            loadLevelQuestion(quizLevelSelect)
        }, 5000)
    }

    const showModal = (id) => {
        setOpenModal(true)
    }

    const hideModal = () => {
        setOpenModal(false)
    }

    const decision = score >= averageScore ? (
        <Fragment>
            <div className="stepsBtnContainer">

                {
                    quizLevelSelect < levelName.length ? (
                        <Fragment>
                            <p className="successMsg"> <GiTrophyCup size='50px' /> Bravo, passez au niveau suivant !</p>
                            <button className="btnResult success" onClick={() => loadLevelQuestion(quizLevelSelect)}>Niveau suivant</button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className="successMsg"><GiPodiumWinner size="50px" /> Bravo, vous êtes un expert !</p>
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
                        <button className="btnInfo"
                            onClick={() => showModal(question.heroId)}>Infos</button>

                    </td>
                </tr>
            )
        })
    ) : (
        <tr >
            <td colSpan="3">
                <Loader loadingMsg={'Pas de reponse !'} styling={{ textAlign: 'center', color: 'red' }} />
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
            <Modal showModal={openModal} hideModal={hideModal}>
                <div className="modalHeader">
                    <h2>Titre</h2>
                </div>
                <div className="modalBody">
                    <h3>Titre 2</h3>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn">Fermer</button>
                </div>
            </Modal>
        </Fragment>

    )
})

export default React.memo(QuizOver)
import axios from 'axios';
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
    } = props;

    const MarvelAPI_Public = process.env.REACT_APP_MARVEL_API
    const hashAPI = "f3024a646ed065e0f068776862b41381"
    const [characterInfo, setCharacterInfo] = useState([])
    const [loadingInfo, setLoadingInfo] = useState(true)

    const [asked, setAsked] = useState([])
    const [openModal, setOpenModal] = useState(false)

    // console.log(asked)

    useEffect(() => {
        setAsked(ref.current)
        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate')
            checkDataAge(date)
        }
    }, [ref])

    const checkDataAge = date => {
        let today = Date.now()
        const timeDiff = today - date
        const daysDiff = timeDiff / (1000 * 3600 * 24)
        if (daysDiff >= 15) {
            localStorage.clear()
            localStorage.setItem('marvelStorageDate', Date.now())
        }
    }

    const averageScore = maxQuestion / 2

    if (score < averageScore) {
        setTimeout(() => {
            loadLevelQuestion(quizLevelSelect)
        }, 5000)
    }

    const showModal = (id) => {
        setOpenModal(true)

        if (localStorage.getItem(id)) {
            setCharacterInfo(JSON.parse(localStorage.getItem(id)))
            setLoadingInfo(false)
        } else {
            // Make a request for a user with a given ID
            axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${MarvelAPI_Public}&hash=${hashAPI}`)
                .then((response) => {
                    // console.log(response);
                    setCharacterInfo(response.data)
                    setLoadingInfo(false)

                    localStorage.setItem(id, JSON.stringify(response.data))
                    if (localStorage.getItem('marvelStorageDate')) {
                        localStorage.setItem('marvelStorageDate', Date.now())
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }

    const hideModal = () => {
        setOpenModal(false)
        setLoadingInfo(true)
    }

    const capitalizedLink = text => {
        return text.charAt(0).toUpperCase() + text.slice(1)
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

    const resultInModal = loadingInfo ? (
        <Fragment>
            <div className="modalHeader">
                <h2>Réponse de Marvel ...</h2>
            </div>
            <div className="modalFooter">
                <button className="modalBtn">Fermer</button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="modalHeader">
                <h2>{characterInfo.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <div className="comicImage">
                    <img
                        src={characterInfo.data.results[0].thumbnail.path + '.' + characterInfo.data.results[0].thumbnail.extension}
                        alt={characterInfo.data.results[0].name} />
                    {characterInfo.attributionText}
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    <p>{characterInfo.data.results[0].description ?
                        characterInfo.data.results[0].description :
                        'Description indisponible ...'}</p>
                    <h3>Plus d'infos</h3>
                    {characterInfo.data.results[0].urls &&
                        characterInfo.data.results[0].urls.map((link, index) => {
                            return <a key={index}
                                href={link.url}
                                className="modalBtn"
                                target="_blank"
                                rel="noreferrer">
                                {capitalizedLink(link.type)}
                            </a>
                        })}
                </div>
            </div>
            <div className="modalFooter">
                <button className="modalBtn" onClick={hideModal}>Fermer</button>
            </div>
        </Fragment>
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
                {resultInModal}
            </Modal>
        </Fragment>

    )
})

export default React.memo(QuizOver)
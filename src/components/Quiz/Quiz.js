import React, { Component, Fragment } from 'react';
import { QuizMarvel } from '../QuizQuestion/QuizMarvel';
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from './QuizOver';

class Quiz extends Component {

    state = {
        quizLevel: ["debutant", "confirme", "expert"],
        quizLevelSelect: 0,
        maxQuestion: 10,
        storeQuestions: [],
        question: null,
        options: [],
        questionId: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        welcomeMsg: false,
        quizEnd: false,
        percent: 0
    }

    quizzDataRef = React.createRef()

    showWelcomeMsg = pseudo => {
        if (!this.state.welcomeMsg) {
            this.setState({
                welcomeMsg: true
            })
            toast.info(`Welcome ${pseudo}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        }
    }

    loadQuestion = (level) => {
        // console.log(level)
        // const fetchArray = QuizMarvel[0].quizz[`${level}`]
        const fetchArray = QuizMarvel[0].quizz[level]
        if (fetchArray.length === this.state.maxQuestion) {
            this.quizzDataRef.current = fetchArray
            const newArray = fetchArray.map(({ answer, ...keepRest }) => keepRest)
            this.setState({ storeQuestions: newArray })
        } else {
            console.log('Pas assez de question!!')
        }
        // console.log(this.quizzDataRef.current[0])
    }

    componentDidMount() {
        this.loadQuestion(this.state.quizLevel[this.state.quizLevelSelect])
    }

    componentDidUpdate(prevProps, prevState) {
        // ne pas oublier le 'state' pour la condition !!!! 
        // console.log(this.state.storeQuestions !== prevState.storeQuestions)
        if (this.state.storeQuestions !== prevState.storeQuestions) {
            this.setState({
                question: this.state.storeQuestions[this.state.questionId].question,
                options: this.state.storeQuestions[this.state.questionId].options
            })
        }
        if (this.state.questionId !== prevState.questionId) {
            this.setState({
                question: this.state.storeQuestions[this.state.questionId].question,
                options: this.state.storeQuestions[this.state.questionId].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo)
        }
    }
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    nextQuestion = () => {
        console.log(this.state.questionId === this.state.maxQuestion - 1)
        if (this.state.questionId === this.state.maxQuestion - 1) {
            this.gameOver()
        } else {
            this.setState({
                questionId: this.state.questionId + 1
            })
        }
        // const answer = QuizMarvel[0].quizz[this.state.quizLevel[this.state.quizLevelSelect]][this.state.questionId].answer
        // console.log(this.state.userAnswer)
        // console.log(this.quizzDataRef[this.state.questionId].answer)
        const answer = this.quizzDataRef.current[this.state.questionId].answer
        if (this.state.userAnswer === answer) {
            this.setState({
                score: this.state.score + 1
            })
            toast.success('Bravo! +1 point', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        } else {
            toast.error('Dommage! 0 point', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        }
    }

    getPercent = (maxQuest, ourScore) => {
        return (ourScore / maxQuest) * 100
    }

    gameOver = () => {

        const percentScore = this.getPercent(this.state.maxQuestion, this.state.score)

        if (percentScore > 50) {
            this.setState({
                quizLevelSelect: this.state.quizLevelSelect + 1,
                percent: percentScore,
                quizEnd: true
            })
        } else {
            this.setState({
                percent: percentScore,
                quizEnd: true
            })
        }
    }


    render() {
        // console.log(this.state.storeQuestions[this.state.questionId].question)
        // console.log(this.state.storeQuestions[this.state.questionId].options)

        // const { pseudo } = this.props.userData

        const displayOption = this.state.options.map((option, index) => {
            return (
                <p key={index}
                    className={`answerOptions ${this.state.userAnswer === option ? 'selected' : ''}`}
                    onClick={() => this.submitAnswer(option)}>
                    {option}
                </p>
            )
        })

        // console.log(this.state.userAnswer)

        return (
            this.state.quizEnd ? (
                <QuizOver 
                    ref={this.quizzDataRef}
                    levelName={this.state.quizLevel}
                    percent={this.state.percent} 
                    score={this.state.score}
                    maxQuestion={this.state.maxQuestion}
                    quizLevelSelect={this.state.quizLevelSelect}/>
            ) :
                (
                    <Fragment>
                        <Levels />
                        <ProgressBar questionId={this.state.questionId}
                            maxQuestion={this.state.maxQuestion} />
                        <ToastContainer />
                        <h2>{this.state.question}</h2>
                        {displayOption}
                        <button className="btnSubmit"
                            disabled={this.state.btnDisabled}
                            onClick={this.nextQuestion}>
                            {this.state.questionId < this.state.maxQuestion - 1 ? 'Suivant' : 'Terminer'}
                        </button>
                    </Fragment>
                )
        )

    }
}

export default Quiz;
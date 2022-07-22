import React, { Component, Fragment } from 'react';
import { QuizMarvel } from '../QuizQuestion/QuizMarvel';
import Levels from './Levels';
import ProgressBar from './ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from './QuizOver';
import { FaChevronRight } from 'react-icons/fa'

class Quiz extends Component {

    constructor(props) {
      super(props)

      this.initialState = {
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
    
      this.state = this.initialState
      this.quizzDataRef = React.createRef()
    }

    // state = {
    //     quizLevel: ["debutant", "confirme", "expert"],
    //     quizLevelSelect: 0,
    //     maxQuestion: 10,
    //     storeQuestions: [],
    //     question: null,
    //     options: [],
    //     questionId: 0,
    //     btnDisabled: true,
    //     userAnswer: null,
    //     score: 0,
    //     welcomeMsg: false,
    //     quizEnd: false,
    //     percent: 0
    // }

    // quizzDataRef = React.createRef()

    showToastMsg = pseudo => {
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
        if ((this.state.storeQuestions !== prevState.storeQuestions) && this.state.storeQuestions.length) {
            this.setState({
                question: this.state.storeQuestions[this.state.questionId].question,
                options: this.state.storeQuestions[this.state.questionId].options
            })
        }
        if ((this.state.questionId !== prevState.questionId) && this.state.storeQuestions.length) {
            this.setState({
                question: this.state.storeQuestions[this.state.questionId].question,
                options: this.state.storeQuestions[this.state.questionId].options,
                userAnswer: null,
                btnDisabled: true
            })
        }
        // console.log('quizEnd : ' + this.state.quizEnd)
        if(this.state.quizEnd !== prevState.quizEnd) {
            const percentScore = this.getPercent(this.state.maxQuestion, this.state.score)
            // maintenant que score est à jour on peut calculer le % est changer le state dans gameOver()
            this.gameOver(percentScore)
        }

        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo)
        }
    }
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    nextQuestion = () => {
        // console.log(this.state.questionId === this.state.maxQuestion - 1)
        if (this.state.questionId === this.state.maxQuestion - 1) {
            // gameOver call dans une condition qui verifie state: QuizEnd dans le CDU
            // car on veut récupérer le score avec le dernier state mise à jour
            // this.gameOver()
            this.setState({
                quizEnd: true
            })
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

    gameOver = (percent) => {

        if (percent > 50) {
            this.setState({
                quizLevelSelect: this.state.quizLevelSelect + 1,
                percent: percent
                // changement du state QuizEnd dans le nextQuestion
            })
        } else {
            this.setState({
                percent: percent
            })
        }
    }

    loadLevelQuestion = params => {
        this.setState({...this.initialState, quizLevelSelect: params})
        this.loadQuestion(this.state.quizLevel[params])
        // console.log(params)
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
                    <FaChevronRight /> {option}
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
                    quizLevelSelect={this.state.quizLevelSelect}
                    loadLevelQuestion={this.loadLevelQuestion}/>
            ) :
                (
                    <Fragment>
                        <Levels quizLevel={this.state.quizLevel} quizLevelSelect={this.state.quizLevelSelect}/>
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
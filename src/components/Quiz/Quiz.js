import React, { Component } from 'react';
import { QuizMarvel } from '../QuizQuestion/QuizMarvel';
import Levels from './Levels';
import ProgressBar from './ProgressBar';

class Quiz extends Component {

    state = {
        quizLevel: ["debutant", "confirme", "expert"],
        quizLevelBegin: 0,
        maxQuestion: 10,
        storeQuestions: [],
        question: null,
        options: [],
        questionId: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0
    }

    quizzDataRef = React.createRef()

    loadQuestion = (level) => {
        // console.log(level)
        // const fetchArray = QuizMarvel[0].quizz[`${level}`]
        const fetchArray = QuizMarvel[0].quizz[level]
        if (fetchArray.length === this.state.maxQuestion) {
            this.quizzDataRef = QuizMarvel[0].quizz[level]
            const newArray = fetchArray.map(({ answer, ...keepRest }) => keepRest)
            this.setState({ storeQuestions: newArray })
        } else {
            console.log('Pas assez de question!!')
        }
    }

    componentDidMount() {
        this.loadQuestion(this.state.quizLevel[this.state.quizLevelBegin])
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
        if(this.state.questionId !== prevState.questionId) {
            this.setState({
                question: this.state.storeQuestions[this.state.questionId].question,
                options: this.state.storeQuestions[this.state.questionId].options,
                userAnswer: null,
                btnDisabled: true
            })
        }
    }
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    nextQuestion = () => {
        if(this.state.questionId === this.state.maxQuestion -1) {
            //end
        } else {
            this.setState({ 
                questionId: this.state.questionId +1
            }) 
        }
        // const answer = QuizMarvel[0].quizz[this.state.quizLevel[this.state.quizLevelBegin]][this.state.questionId].answer
        // console.log(this.state.userAnswer)
        // console.log(this.quizzDataRef[this.state.questionId].answer)
        const answer = this.quizzDataRef[this.state.questionId].answer
        if(this.state.userAnswer === answer) {
            this.setState({
                score: this.state.score + 1
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
            <div>
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>
                {displayOption}
                <button className="btnSubmit"
                    disabled={this.state.btnDisabled}
                    onClick={this.nextQuestion}>
                    Suivant
                </button>
            </div>
        );
    }
}

export default Quiz;
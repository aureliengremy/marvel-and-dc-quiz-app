import React, { Component } from 'react';
import { QuizMarvel } from '../QuizQuestion/QuizMarvel';
import Levels from './Levels';
import ProgressBar from './ProgressBar';

class Quiz extends Component {

    state = {
        quizLevel: ["debutant","confirme","expert"],
        quizLevelBegin: 0,
        maxQuestion: 10,
        storeQuestions: [],
        question: null,
        options: [],
        questionId: 0
    }

    loadQuestion = (level) => {
        // console.log(level)
        // const fetchArray = QuizMarvel[0].quizz[`${level}`]
        const fetchArray = QuizMarvel[0].quizz[level]
        if(fetchArray.length === this.state.maxQuestion) {
            const newArray = fetchArray.map(({answer, ...keepRest}) => keepRest) 
            this.setState({storeQuestions: newArray})
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
        if(this.state.storeQuestions !== prevState.storeQuestions) {
            this.setState({
                question: this.state.storeQuestions[this.state.questionId].question,
                options: this.state.storeQuestions[this.state.questionId].options
            })
        }
    } 
    
    
    render() {
        // console.log(this.state.storeQuestions[this.state.questionId].question)
        // console.log(this.state.storeQuestions[this.state.questionId].options)
        
        const {pseudo} = this.props.userData

        const displayOption = this.state.options.map((option, index) => {
            return <p key={index} className="answerOptions">{option}</p>
        })

        return (
            <div>
                <Levels/>
                <ProgressBar/>
                <h2>{this.state.question}</h2>
                {displayOption}
                <button className="btnSubmit">Suivant</button>
            </div>
        );
    }
}

export default Quiz;
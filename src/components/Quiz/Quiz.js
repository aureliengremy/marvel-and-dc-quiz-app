import React, { Component } from 'react';

class Quiz extends Component {
    
    render() {
        
        const {pseudo} = this.props.userData

        return (
            <div>
                <h2>Quiz</h2>
                <p>{`Pseudo : ${pseudo}`}</p>
            </div>
        );
    }
}

export default Quiz;
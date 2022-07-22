import React from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({ quizLevel, quizLevelSelect }) => {

  const StepsArray = quizLevel.map((level, index) => {
    return { title: level.toUpperCase() }
  })

  return (
    <div className="levelsContainer" style={{backgroundColor:"transparent"}}>
      <Stepper steps={StepsArray}
        activeStep={quizLevelSelect} 
        circleTop={0}
        activeTitleColor={'#d31017'}
        activeColor={'#d31017'}
        completeTitleColor={'#e0e0e0'}
        completeColor={'#e0e0e0'}
        defaultTitleColor={'#e0e0e0'}
        completeBarColor={'#e0e0e0'}
        size={60}/>
    </div>
  )
}

export default React.memo(Levels)
import React, { Fragment, useEffect, useRef, useState } from 'react'

const Landing = () => {
    
    const [btn, setBtn] = useState(false)

    const refWolverine = useRef(null)

    useEffect(() => {
        refWolverine.current.classList.add('startingImg')
        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg')
            setBtn(true)
        }, 1000)
    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add('leftImg')
    }
    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg')
    }

    const clearImg = () => {
        if(refWolverine.current.classList.contains('leftImg')) {
            refWolverine.current.classList.remove('leftImg')
        } else if(refWolverine.current.classList.contains('rightImg')) {
            refWolverine.current.classList.remove('rightImg')
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg}>
                <button className="btn-landing">
                    Inscription
                </button>
            </div>
            <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg}>
                <button className="btn-landing">
                    Connexion
                </button>
            </div>
        </Fragment>
    )
    
    
  return (
    <main className="welcomePage" ref={refWolverine}>
        { displayBtn }
    </main>
  )
}

export default Landing
import React, { useEffect, useState } from 'react'
import { auth } from '../../Firebase/configFirebase'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(false)

    useEffect(() => {
      if(checked) {
        console.log('déconnexion')
        signOut(auth).then(() => {
            // Sign-out successful.
            setTimeout(() => {
                navigate('/')
            },[1000])
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
      }

    }, [checked, navigate])

    const handleChange = e => {
        console.log(e)
        // setChecked(true)
        setChecked(e.target.checked)
    }

  return (
    <div className="logoutContainer">
        <label className="switch">
            <input onChange={handleChange} type="checkbox" checked={checked} />
            <span className="slider round"></span>
        </label>

    </div>
  )
}

export default Logout
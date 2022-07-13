import React, { useEffect, useState } from 'react'
import { auth } from '../../Firebase/configFirebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  // const data = {
  //   email: '',
  //   password: ''
  // }

  // const [login, setLogin] = useState(data)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btn, setBtn] = useState(false)


  
  useEffect(() => {
    if(password.length > 5 && email !== '') {
      setBtn(true)
    } else if (btn) {
      setBtn(false)
    }
  }, [password, email, btn])
  
  const handleSubmit = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)

        navigate('/welcome', { replace: true })
        // replace:true supprime le retour à la page precedente de l'historique
      })
      .catch((error) => {
        setEmail('')
        setPassword('')
        if(error.code === 'auth/user-not-found') {
          setError('Aucun compte associé à cet email')
        } else if(error.code === 'auth/wrong-password') {
          setError('Mauvais mot de passe')
        } else {
          setError('Quelques choses ne va pas')
        }
      });
  }

  const btnElement = btn ?
    <button>Connexion</button> : <button disabled>Connexion</button>

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {error !== '' && <span>{error}</span>}
              <h2>Connexion</h2>
              <div className="inputBox">
                <input onChange={e => setEmail(e.target.value)} value={email} type="email"
                  id="email"
                  autoComplete="off"
                  required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input onChange={e => setPassword(e.target.value)} value={password} type="password"
                  id="password"
                  autoComplete="off"
                  required />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {btnElement}
            </form>
            <div className="linkContainer">
              <Link className='simpleLink' to="/signup">Déjà inscrit ? Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
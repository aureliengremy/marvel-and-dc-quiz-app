import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase/configFirebase'


const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError(null)
                setSuccess(`Consultez votre email ${email} pour modififer votre mot de passe`)
                setTimeout(() => {
                    navigate('/login')
                }, 5000);
            })
            .catch((error) => {
                setError(error)
                setEmail('')
            });
    }

    const disabled = email === ''


    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <form onSubmit={handleSubmit}>
                            {error && <span>{error.message}</span>}
                            {success && <span style={{
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}>{success}</span>}
                            <h2>Mot de passe oublié ?</h2>
                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email"
                                    id="email"
                                    autoComplete="off"
                                    required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled={disabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className='simpleLink' to="/login">Déjà inscrit ? Connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
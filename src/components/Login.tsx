import { useState } from 'react'
import '../styles/login.css'
import useAuthStore from '../data/store'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const loginHandler = async () => {
        console.log('loginHandler called');
        
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            console.log('Response recieved', response);
            
            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage('Invalid email or password')
                } else {
                    setErrorMessage('Something did or did not happen, please try again later')
                }
                return
            }
            const data = await response.json()
            const {token, username, userId} = data
            sessionStorage.setItem('authToken', token)
            useAuthStore.getState().checkAuth()
            useAuthStore.getState().setUserInfo(username, userId)
            setErrorMessage(null)
            console.log('I dids it wiiii', errorMessage);            
        } catch ( error) {
            setErrorMessage('Something happened, please try again later')
        }
        
    }

    //  TODO:
    // add linkfunctionality to skip nad new account functionality

    return (
        <section>
            <div className='login-container'>
                <input type="email" placeholder='mail@mail.com' className='login-inputs' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' className='login-inputs' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='login-btn' onClick={() => {console.log('loginbutton clicked'); loginHandler()}}> Login</button>
            </div>
            <div className='btn-container-login'>
                <button className='create-account-btn'> Create new account </button>
                <button className='skip-btn'> Skip </button>
            </div>
        </section>
    )
}

export default Login
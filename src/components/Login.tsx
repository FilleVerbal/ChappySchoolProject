import { useState } from 'react'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const loginHandler = async () => {
        try {
            const response = await fetch('api/users/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage('Invalid email or password')
                } else {
                    setErrorMessage('Something did or did not happen, please try again later')
                }
                return
            }
            const data = await response.json()
            const {token} = data
            sessionStorage.setItem('authToken', token)
            setErrorMessage(null)
            console.log('I dids it wiiii');            
        } catch ( error) {
            setErrorMessage('Something happened, please try again later')
        }
        
    }

    //  TODO:
    // add linkfunctionality to skip

    return (
        <section>
            <div className='login-container'>
                <input type="email" placeholder='mail@mail.com' className='login-inputs' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' className='login-inputs' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='login-btn' onClick={loginHandler}> Login</button>
            </div>
            <div className='btn-container-login'>
                <button className='create-account-btn'> Create new account </button>
                <button className='skip-btn'> Skip </button>
            </div>
        </section>
    )
}

export default Login
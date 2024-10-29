import { useState } from 'react'

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //  TODO:
    // add the functionality to login and create later with skip handling like a link and so on

    return (
        <section>
            <div className='login-container'>
                <input type="email" placeholder='mail@mail.com' className='login-inputs' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' className='login-inputs' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='login-btn'> Login</button>
            </div>
            <div className='btn-container-login'>
                <button className='create-account-btn'> Create new account </button>
                <button className='skip-btn'> Skip </button>
            </div>
        </section>
    )
}

export default Login
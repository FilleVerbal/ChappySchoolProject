import { useState } from 'react'

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('Guest')

    // TODO clickfunctionality for logging in and out

    return (
        <nav className='the-header'>
            <div>
                <button className='header-chappy-btn'> Chappy </button>
            </div>
            <div>
                <p> {isLoggedIn ? username : 'Guest'} </p>
                <button> {isLoggedIn ? 'Logout' : 'Login'} </button>
            </div>

        </nav>

    )
}

export default Header
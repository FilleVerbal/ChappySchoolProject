import useAuthStore from '../data/store'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import '../styles/header.css'

const Header: React.FC = () => {
    const { isLoggedIn, logout, username } = useAuthStore()
    const navigate: NavigateFunction = useNavigate()


    const logoutHandler = () => {
        logout()
    }
    const loginHandler = () => {
        navigate('/')
    }
    const logButtonHandler = () => {
        isLoggedIn? logoutHandler() : loginHandler();
    }

    return (
        <nav className='the-header'>
            <div>
                <h3 className='header-chappy-btn'> Chappy </h3>
            </div>
            <div>
                <p> {isLoggedIn ? username : 'Guest'} </p>
                <button onClick={logButtonHandler}> {isLoggedIn ? 'Logout' : 'Login'} </button>
            </div>

        </nav>

    )
}

export default Header
import useAuthStore from '../data/store'
import { NavigateFunction, useNavigate } from 'react-router-dom'

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
                <button className='header-chappy-btn'> Chappy </button>
            </div>
            <div>
                <p> {isLoggedIn ? username : 'Guest'} </p>
                <button onClick={logButtonHandler}> {isLoggedIn ? 'Logout' : 'Login'} </button>
            </div>

        </nav>

    )
}

export default Header
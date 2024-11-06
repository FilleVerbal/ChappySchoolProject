// import { useEffect } from 'react'
// import useAuthStore from '../data/store'

// const Header: React.FC = () => {
//     const { isLoggedIn, checkAuth, logout } = useAuthStore()

//     useEffect(() => {
//         checkAuth()
//     }, [checkAuth])

//     return (
//         <nav className='the-header'>
//             <div>
//                 <button className='header-chappy-btn'> Chappy </button>
//             </div>
//             <div>
//                 <p> {isLoggedIn ? username : 'Guest'} </p>
//                 <button> {isLoggedIn ? 'Logout' : 'Login'} </button>
//             </div>

//         </nav>

//     )
// }

// export default Header
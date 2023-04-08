import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <nav className="navbar-container">
            <NavLink to="/" className="navbar-home"> Home </NavLink>
            {user ? (
                <>
                    <p className="navbar-user">Hi, <span>  {user.userName} </span> </p>
                    <NavLink to="/logout" className="navbar-logout"> Log out</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login" className="navbar-login"> Login </NavLink>
                    <NavLink to="/register" className="navbar-register"> Register</NavLink>
                </>
            )}
        </nav>
    )
}

export default Navbar;

import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../apis/userAPI';
import './Navbar.css'

const Navbar = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(dispatch, user?._id, navigate, user?.accessToken);
    }

    return (
        <nav className="navbar-container">
            <NavLink to="/" className="navbar-home"> Home </NavLink>
            {user ? (
                <>
                    <p className="navbar-user">Hi, <span>  {user.userName} </span> </p>
                    <NavLink to="/logout" onClick={handleLogout} className="navbar-logout"> Log out</NavLink>
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

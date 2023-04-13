import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../apis/userAPI';
import './Login.css';

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { userName: userName, password: password };
        loginUser(user, dispatch, navigate)
    }

    return (
        <div className='login-scene'>
            <form className='login' onSubmit={handleLogin}>
                <h1 className="header-login">Login</h1>
                <FormControl variant="standard" sx={{ m: 1 }}>
                    <InputLabel htmlFor="name">User name</InputLabel>
                    <Input
                        id="name"
                        aria-describedby="userName"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        type='text'
                        required={true}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <FormHelperText id="userName">Enter your name</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        required={true}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormHelperText id="password">Enter your password</FormHelperText>
                </FormControl>
                <center>
                    <Button type='submit' variant="contained" color="success" className="btn-login">
                        Login
                    </Button>
                </center>

                <center>
                    <div className="login-register">Don't have an account yet?</div>
                    <div>
                        <NavLink to='/register' className="to-register-link">
                            Register
                        </NavLink>
                    </div>
                </center>
            </form>
        </div>
    );
}

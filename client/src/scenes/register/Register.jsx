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
import './Register.css';
import { registerUser } from '../../apis/userAPI';

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [email, setEmail] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = { userName, email, password }
        registerUser(newUser, dispatch, navigate)
    }

    return (
        <div className='register-scene'>
            <form className='register' onSubmit={handleRegister}>
                <h1 className="header-register">Register</h1>
                <FormControl variant="standard" sx={{ m: 1 }}>
                    <InputLabel htmlFor="name">User name</InputLabel>
                    <Input
                        id="name"
                        aria-describedby="userName"
                        required={'true'}
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <FormHelperText id="userName">Enter your name</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="name">Email</InputLabel>
                    <Input
                        id="email"
                        name='email'
                        aria-describedby="email"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        type='email'
                        required={'true'}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormHelperText id="email">Enter your email</FormHelperText>
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
                        required={'true'}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormHelperText id="password">Enter your password</FormHelperText>
                </FormControl>

                <center>
                    <Button type='submit' variant="contained" color="success" className="btn-register">
                        Register
                    </Button>
                </center>

                <center>
                    <div className="login-register">Have an account ?</div>
                    <div>
                        <NavLink to='/login' className="to-login-link">
                            Login
                        </NavLink>
                    </div>
                </center>
            </form>
        </div>
    );
}

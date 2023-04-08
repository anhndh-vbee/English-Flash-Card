import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AllCards from './scenes/allCards/AllCards';
import Login from './scenes/login/Login';
import Register from './scenes/register/Register';
import Navbar from './component/navbar/Navbar';

function App() {
    return (
        <div className='app'>
            <Router>
                <Navbar />
                <Routes>
                    {/* <Route path='/' element={<AllCards />}></Route> */}
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                </Routes>
            </Router>
            {/* <img src='http://localhost:8086/uploads/2fdba102338433ddef6cb7a3f41f9c04'></img> */}
        </div>
    )
}

export default App;

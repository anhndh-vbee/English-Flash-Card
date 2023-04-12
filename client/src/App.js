import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AllCards from './scenes/allCards/AllCards';
import Login from './scenes/login/Login';
import Register from './scenes/register/Register';
import Navbar from './component/navbar/Navbar';
import AllLessons from './scenes/allLessons/AllLessons';
import EditCard from './scenes/editCard/EditCard';
import AddCardForm from './scenes/addCard/AddCardForm';
import AddLessonForm from './scenes/addLesson/AddLesson';

function App() {
    return (
        <div className='app'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<AllCards />}></Route>
                    <Route path='/list-lesson' element={<AllLessons />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/update-card/:id' element={<EditCard />}></Route>
                    <Route path='/add-card' element={<AddCardForm />}></Route>
                    <Route path='/add-lesson' element={<AddLessonForm />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;

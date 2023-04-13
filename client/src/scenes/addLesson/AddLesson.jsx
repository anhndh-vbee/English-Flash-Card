import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLesson } from "../../apis/lessonAPI";
import './AddLesson.css'

const AddLessonForm = () => {
    const user = useSelector(state => state.auth.login?.currentUser);
    const _cards = useSelector(state => state.cards.allCards?.listCards);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [cardAddToLesson, setCardAddToLesson] = useState();

    const handleShowAddLesson = () => {
        if (document.getElementById('inputCard').style.display === 'none') {
            document.getElementById('inputCard').style.display = ''
        } else {
            document.getElementById('inputCard').style.display = 'none'
        }
    }

    const setCardListToAdd = (value) => {
        const _listCard = value.replace(' ', '');
        const listCards = _listCard.split(',');
        setCardAddToLesson(listCards);
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        if (cardAddToLesson) {
            const newLesson = { description, cards: cardAddToLesson };
            console.log(newLesson);
            addLesson(user?.accessToken, dispatch, newLesson);
            navigate('/');
        } else {
            addLesson(user?.accessToken, dispatch, { description });
            navigate('/');
        }
    }

    return (
        <>
            <div className="add-lesson-form-container">
                <div className="add-lesson-form-header">
                    Add new lesson
                </div>
                <form className="form-add-lesson-main" onSubmit={handleAddLesson}>
                    <FormControl variant="standard" sx={{ m: 1 }}>
                        <InputLabel htmlFor="description">Name</InputLabel>
                        <Input
                            id="description"
                            aria-describedby="description"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            type='text'
                            required={true}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <FormHelperText id="description">Enter lesson name</FormHelperText>
                    </FormControl>

                    <Button sx={{ fontSize: 'small', width: 'fit-content' }} color="warning" variant="contained" onClick={handleShowAddLesson}>Do you want to add any card to this lesson?</Button>

                    <FormControl id="inputCard" variant="standard" sx={{ m: 1 }}>
                        <InputLabel htmlFor="card">Card</InputLabel>
                        <Input
                            id="card"
                            aria-describedby="card"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            type='text'
                            onChange={e => setCardListToAdd(e.target.value)}
                        />
                        <FormHelperText id="card">Enter card id</FormHelperText>
                    </FormControl>

                    <Button type='submit' color="primary" variant="contained">Submit</Button>
                </form>
            </div>

            <div className="list-card-choice-contain">
                <div className="list-card-choice-header">List card</div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                    </tr>
                    {_cards && _cards.map((_card, index) => (
                        <tr key={index}>
                            <td>{_card._id}</td>
                            <td>{_card.description}</td>
                        </tr>
                    )
                    )}
                </table>
                {!_cards && (
                    <div className="no-card">
                        No cards be created
                    </div>
                )}
            </div>
        </>
    )
}

export default AddLessonForm;

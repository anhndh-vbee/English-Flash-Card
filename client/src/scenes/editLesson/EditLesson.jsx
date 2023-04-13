import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateLesson } from "../../apis/lessonAPI";
import './EditLesson.css'

const EditLesson = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.login?.currentUser);
    const allLessons = useSelector(state => state.lessons.allLessons?.listLessons);
    const allCards = useSelector(state => state.cards.allCards?.listCards);

    const lessonToUpdate = allLessons?.find(lesson => lesson?._id === id)

    const { description, cards } = lessonToUpdate;
    const [values, setValues] = useState({
        description, cards
    })

    const handleEditLesson = (id) => {
        const lessonUpdated = { description: values.description, cards: values.cards }
        updateLesson(user?.accessToken, dispatch, id, lessonUpdated)
        alert('Update lesson successfully');
        navigate('/')
    }

    return (
        <>
            {
                lessonToUpdate && (
                    <>
                        <div className="edit-lesson-container">
                            <div className="edit-lesson-header">Edit lesson</div>
                            <form onSubmit={() => handleEditLesson(lessonToUpdate?._id)} className="form-update-lesson">
                                <FormControl variant="standard" sx={{ m: 1 }}>
                                    <InputLabel htmlFor="description">Name</InputLabel>
                                    <Input
                                        id="description"
                                        aria-describedby="description"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        type='text'
                                        value={values.description}
                                        onChange={(e) => setValues({ ...values, description: e.target.value })}
                                    />
                                    <FormHelperText id="description">Change name lesson</FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" sx={{ m: 1 }}>
                                    <InputLabel htmlFor="cards">List cards</InputLabel>
                                    <Input
                                        id="cards"
                                        aria-describedby="cards"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        type='text'
                                        value={values.cards}
                                        onChange={(e) => setValues({ ...values, cards: e.target.value.replace(' ', '').split(',') })}
                                    />
                                    <FormHelperText id="cards">Change name lesson</FormHelperText>
                                </FormControl>

                                <Button type="submit" color="primary" variant="contained">Update</Button>
                            </form>
                        </div>

                        <div className="list-card-to-edit">
                            <div className="list-card-choice-header">List card</div>
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                </tr>
                                {allCards && allCards.map((card, index) => (
                                    <tr key={index}>
                                        <td>{card._id}</td>
                                        <td>{card.description}</td>
                                    </tr>
                                )
                                )}
                            </table>
                            {!allCards && (
                                <div className="no-card">
                                    No cards be created
                                </div>
                            )}
                        </div>
                    </>
                )
            }

            {
                !lessonToUpdate && (
                    <div>Not found lesson</div>
                )
            }
        </>
    )
}

export default EditLesson;

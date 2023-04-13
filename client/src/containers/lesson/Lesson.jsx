import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { deleteLesson } from "../../apis/lessonAPI";
import Card from "../card/Card";
import './Lesson.css';
import { NavLink } from "react-router-dom";

const Lesson = ({ id }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login?.currentUser);
    const allLessons = useSelector(state => state.lessons.allLessons?.listLessons);
    const lessonToShow = allLessons?.find(lesson => lesson?._id === id);
    const listCardOfLesson = lessonToShow && lessonToShow?.cards;

    const handleDeleteLesson = (idLesson) => {
        deleteLesson(user?.accessToken, dispatch, idLesson);
        alert(`You have deleted the lesson with name: ${lessonToShow?.description}`)
    }

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login')
    //     }

    //     if (user?.accessToken) {
    //         getLesson(user?.accessToken, dispatch, id)
    //         cardsOfLesson.map((card) => {
    //             getCard(user?.accessToken, dispatch, card)
    //         })
    //     }

    // }, [])

    return (
        <>
            {lessonToShow && user?.isAdmin && listCardOfLesson && (
                <div className="lesson-container">
                    <div className="lesson-header-and-action">
                        <div className="lesson-header">{lessonToShow.description}</div>
                        <div className="lesson-action">
                            <Button color="error" variant="contained" onClick={() => handleDeleteLesson(lessonToShow?._id)}>Delete</Button>
                            <NavLink to={`/edit-lesson/${lessonToShow?._id}`}><Button color="warning" variant="contained">Edit</Button></NavLink>
                        </div>
                    </div>
                    <hr />
                    <div className="list-card-of-lesson">
                        {listCardOfLesson?.map((card, index) => (
                            <div key={index} className="card-of-lesson">
                                <Card idCard={card} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {lessonToShow && !user?.isAdmin && listCardOfLesson && (
                <div className="lesson-container">
                    <div className="lesson-header-check">
                        <div className="lesson-header">{lessonToShow.description}</div>
                        <input className="check-lesson" type="checkbox" />Lesson checked
                    </div>
                    <hr />
                    <div className="list-card-of-lesson">
                        {listCardOfLesson?.map((card, index) => (
                            <div key={index} className="card-of-lesson">
                                <Card isCardInLesson={true} idCard={card} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!listCardOfLesson && (
                <div>Loading...</div>
            )}
        </>
    )
}

export default Lesson;

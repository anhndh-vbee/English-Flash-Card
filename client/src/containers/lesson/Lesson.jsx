import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteLesson, getLesson } from "../../apis/lessonAPI";
import { getCard } from "../../apis/cardAPI";
import Card from "../card/Card";
import './Lesson.css';
import { Button, Stack } from "@mui/material";

const Lesson = ({ id }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                            <Button color="warning" variant="contained">Edit</Button>
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

            {!listCardOfLesson && (
                <div>Loading...</div>
            )}
        </>
    )
}

export default Lesson;

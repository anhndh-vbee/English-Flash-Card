import { useEffect } from "react"
import { deleteLesson, getAllLessons } from "../../apis/lessonAPI"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import Lesson from "../../containers/lesson/Lesson";
import { Button } from "@mui/material";

const AllLessons = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const lessons = useSelector((state) => state.lessons.allLessons?.listLessons);
    // const message = useSelector((state) => state.lessons?.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteLesson = (id) => {
        deleteLesson(user?.accessToken, dispatch, id)
    }

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        if (user?.accessToken) {
            getAllLessons(user?.accessToken, dispatch);
        }
    }, [])
    return (
        <div className="all-lesson">
            <div className="list-lesson-header">List lesson</div>
            {user?.isAdmin && (
                <NavLink to={'/add-lesson'}><Button variant="contained" color="primary">Add lesson</Button></NavLink>
            )}
            <div className="all-lessons-container">
                {lessons?.map((lesson, index) => {
                    return (
                        <div className="a-lesson" key={index}>
                            <Lesson id={lesson?._id} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllLessons;

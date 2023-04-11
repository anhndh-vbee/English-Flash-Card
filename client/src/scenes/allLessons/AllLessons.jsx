import { useEffect } from "react"
import { deleteLesson, getAllLessons } from "../../apis/lessonAPI"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

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
            {user?.isAdmin && <div>You are Admin</div>}
            <div className="all-lessons-container">
                {lessons?.map((lesson, index) => {
                    return (
                        <div key={index} className="lesson-container">
                            <div>{lesson.description}</div>
                            <div onClick={() => handleDeleteLesson(lesson?._id)}>Delete</div>
                        </div>
                    )
                })}
                <button onClick={() => navigate('/list-card')}>111</button>
            </div>
        </div>
    )
}

export default AllLessons;

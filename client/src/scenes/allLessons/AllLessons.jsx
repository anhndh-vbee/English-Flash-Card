import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Lesson from "../../containers/lesson/Lesson";
import { getAllLessons } from "../../apis/lessonAPI"
import { getAllCards } from "../../apis/cardAPI";

const AllLessons = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const lessons = useSelector((state) => state.lessons.allLessons?.listLessons);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        if (user?.accessToken) {
            getAllLessons(user?.accessToken, dispatch);
            getAllCards(user?.accessToken, dispatch);
        }
    }, [])
    return (
        <div className="all-lesson" style={{ backgroundColor: 'whitesmoke' }}>
            <div className="list-lesson-header" style={{ textAlign: 'center', fontSize: 'large', fontWeight: 'bold', color: '#23085A' }}>List lesson</div>
            {user?.isAdmin && (
                <NavLink style={{ textAlign: 'center' }} to={'/add-lesson'}><Button color="primary">Add lesson</Button></NavLink>
            )}
            <div className="all-lessons-container">
                {lessons?.map((lesson, index) => {
                    return (
                        <Lesson id={lesson?._id} key={index} />
                    )
                })}
            </div>
        </div>
    )
}

export default AllLessons;

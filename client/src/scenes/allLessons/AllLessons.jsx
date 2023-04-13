import { useEffect } from "react"
import { getAllLessons } from "../../apis/lessonAPI"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import Lesson from "../../containers/lesson/Lesson";
import { Button } from "@mui/material";
import { getAllCards } from "../../apis/cardAPI";

const AllLessons = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const lessons = useSelector((state) => state.lessons.allLessons?.listLessons);
    // const message = useSelector((state) => state.lessons?.message);
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
        <div className="all-lesson">
            {/* <div className="list-lesson-header">List lesson</div> */}
            {user?.isAdmin && (
                <NavLink style={{ marginLeft: '5px' }} to={'/add-lesson'}><Button variant="contained" color="primary">Add lesson</Button></NavLink>
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

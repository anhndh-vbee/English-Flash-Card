import axios from "axios";
import {
    addLessonFailed,
    addLessonStart,
    addLessonSuccess,
    deleteLessonFailed, deleteLessonStart, deleteLessonSuccess,
    getAllLessonsFailed, getAllLessonsStart, getAllLessonsSuccess,
    getLessonFailed, getLessonStart, getLessonSuccess, updateLessonFailed, updateLessonStart, updateLessonSuccess
} from "../redux/lessonSlice";
import DOMAIN from "../config";

export const getAllLessons = async (accessToken, dispatch) => {
    dispatch(getAllLessonsStart());
    try {
        const res = await axios.get(`${DOMAIN}/lesson/get-all-lessons`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(getAllLessonsSuccess(res.data));
    } catch (error) {
        dispatch(getAllLessonsFailed());
    }
}

export const getLesson = async (accessToken, dispatch, id) => {
    dispatch(getLessonStart());
    try {
        const res = await axios.get(`${DOMAIN}/lesson/get-lesson/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(getLessonSuccess(res.data));
    } catch (error) {
        dispatch(getLessonFailed());
    }
}

export const deleteLesson = async (accessToken, dispatch, id) => {
    dispatch(deleteLessonStart());
    try {
        const res = await axios.delete(`${DOMAIN}/lesson/delete-lesson/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(deleteLessonSuccess(res.data));
    } catch (error) {
        dispatch(deleteLessonFailed());
    }
}

export const addLesson = async (acccessToken, dispacth, lesson) => {
    dispacth(addLessonStart());
    try {
        const res = await axios.post(`${DOMAIN}/lesson/add-lesson`, lesson, {
            headers: { token: `Bearer ${acccessToken}` }
        });
        dispacth(addLessonSuccess(res.data));
    } catch (error) {
        dispacth(addLessonFailed());
    }
}

export const updateLesson = async (acccessToken, dispacth, id, lesson) => {
    dispacth(updateLessonStart());
    try {
        const res = await axios.post(`${DOMAIN}/lesson/update-lesson/${id}`, lesson, {
            headers: { token: `Bearer ${acccessToken}` }
        });
        dispacth(updateLessonSuccess(res.data));
    } catch (error) {
        dispacth(updateLessonFailed());
    }
}

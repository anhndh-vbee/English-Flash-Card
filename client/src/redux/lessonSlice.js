import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        allLessons: {
            listLessons: null,
            loading: false,
            error: false
        },
        message: "",
    },
    reducers: {
        getAllLessonsStart: (state) => {
            state.allLessons.loading = true;
        },
        getAllLessonsSuccess: (state, action) => {
            state.allLessons.loading = false;
            state.allLessons.listLessons = action.payload;
        },
        getAllLessonsFailed: (state) => {
            state.allLessons.loading = false;
            state.allLessons.error = true;
        },
        getLessonStart: (state) => {
            state.allLessons.loading = true;
        },
        getLessonSuccess: (state, action) => {
            state.allLessons.loading = false;
            state.allLessons.listLessons = action.payload;
        },
        getLessonFailed: (state) => {
            state.allLessons.loading = false;
            state.allLessons.error = true;
        },
        deleteLessonStart: (state) => {
            state.allLessons.loading = true;
        },
        deleteLessonSuccess: (state, action) => {
            state.allLessons.loading = false;
            state.message = action.payload;
        },
        deleteLessonFailed: (state, action) => {
            state.allLessons.loading = false;
            state.allLessons.error = true;
            state.message = action.payload
        },
        addLessonStart: (state) => {
            state.allLessons.loading = true;
        },
        addLessonSuccess: (state, action) => {
            state.allLessons.loading = false;
            state.allLessons.listLessons = action.payload;
            state.allLessons.error = false;
        },
        addLessonFailed: (state, action) => {
            state.allLessons.loading = false;
            state.allLessons.error = true;
            state.message = action.payload;
        },
        updateLessonStart: (state) => {
            state.allLessons.loading = true;
        },
        updateLessonSuccess: (state, action) => {
            state.allLessons.loading = false;
            state.allLessons.listLessons = action.payload;
            state.allLessons.error = false;
        },
        updateLessonFailed: (state) => {
            state.allLessons.error = true;
            state.allLessons.loading = false;
        }
    }
})

export const {
    getAllLessonsStart, getAllLessonsSuccess, getAllLessonsFailed,
    getLessonStart, getLessonSuccess, getLessonFailed,
    deleteLessonStart, deleteLessonSuccess, deleteLessonFailed,
    addLessonStart, addLessonSuccess, addLessonFailed,
    updateLessonStart, updateLessonSuccess, updateLessonFailed
} = lessonSlice.actions;

export default lessonSlice.reducer;

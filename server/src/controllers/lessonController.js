const { Lesson } = require('../models/lesson_card');

const getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const lesson = await Lesson.findById(lessonId).populate('cards');
        res.status(200).json(lesson)
    } catch (error) {
        res.status(500).json(error);
    }
}

const addLesson = async (req, res) => {
    try {
        const newLesson = new Lesson(req.body);
        const saveLesson = await newLesson.save();
        res.status(200).json(saveLesson);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const updateLesson = req.body;
        await Lesson.findByIdAndUpdate(lessonId, updateLesson);
        res.status(200).json('Update lesson successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        await Lesson.findByIdAndDelete(lessonId);
        res.status(200).json('Delete lesson successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllLessons,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson
}

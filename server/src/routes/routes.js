const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { addCard, getAllCards, updateCard, deleteCard, getCard } = require('../controllers/cardController');
const { addLesson, getAllLessons, getLesson, updateLesson, deleteLesson } = require('../controllers/lessonController');
const { checkToken, checkAuthAdmin } = require('../controllers/middlewareController');

const routes = express.Router();

// card
routes.post('/card/add-card', checkAuthAdmin, upload.single('image'), addCard);
routes.get('/card/get-all-cards', checkToken, getAllCards);
routes.get('/card/get-card/:id', checkToken, getCard);
routes.put('/card/update-card/:id', checkAuthAdmin, updateCard);
routes.delete('/card/delete-card/:id', checkToken, checkAuthAdmin, deleteCard);

// lesson
routes.post('/lesson/add-lesson', checkAuthAdmin, addLesson);
routes.get('/lesson/get-all-lessons', checkToken, getAllLessons);
routes.get('/lesson/get-lesson/:id', checkToken, getLesson);
routes.put('/lesson/update-lesson/:id', checkAuthAdmin, updateLesson);
routes.delete('/lesson/delete-lesson/:id', checkAuthAdmin, deleteLesson);

module.exports = routes;

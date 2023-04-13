const { Card, Lesson } = require("../models/lesson_card.js")

const addCard = async (req, res) => {
    try {
        const image = req.file.path;
        const description = req.body.description;
        const lesson = req.body.lesson;

        const newCard = new Card({ image, description, lesson });
        const saveCard = await newCard.save();
        if (lesson) {
            const _lesson = await Lesson.findById(lesson);
            await _lesson.updateOne({ $push: { cards: saveCard._id } });
        }
        res.status(200).json(saveCard);
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getCard = async (req, res) => {
    try {
        const cardId = req.params.id
        const card = await Card.findById(cardId);
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateCard = async (req, res) => {
    try {
        const cardId = req.params.id;
        const image = req.file.path;
        const description = req.body.description;
        const cardUpdated = { image, description };
        await Card.findByIdAndUpdate(cardId, cardUpdated);
        res.status(200).json('Update card successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteCard = async (req, res) => {
    try {
        const cardId = req.params.id;
        await Lesson.updateMany(
            { cards: cardId },
            { $pull: { cards: cardId } }
        )
        await Card.findByIdAndDelete(cardId);
        res.status(200).json('Delete card successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    addCard,
    getAllCards,
    updateCard,
    deleteCard,
    getCard
}

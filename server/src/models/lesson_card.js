const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }
}, {
    timestamps: true
})

const lessonSchema = new mongoose.Schema({
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Card = mongoose.model('Card', cardSchema);
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Card, Lesson };


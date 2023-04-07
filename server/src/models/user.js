const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [5, 'Name must have more than 5 characters'],
        maxLength: [20, 'Name must have less than 20 characters'],
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        minLength: [6, 'Password must have more than 6 characters'],
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    lessonLearned: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        }
    ]
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;

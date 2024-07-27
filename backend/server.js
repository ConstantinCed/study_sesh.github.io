const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/studyTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to the database');
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const questionSchema = new mongoose.Schema({
    questionText: String,
    userAnswer: String,
    timestamp: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);

app.post('/questions', async (req, res) => {
    const question = new Question({
        questionText: req.body.questionText,
        userAnswer: req.body.userAnswer
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

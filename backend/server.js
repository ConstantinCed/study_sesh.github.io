const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');
const questionRouter = require('./routes/questions');

app.use(express.json());
app.use('/questions', questionRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

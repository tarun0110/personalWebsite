const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect to Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//defining routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/bus', require('./routes/api/bus'));
app.use('/public/project', require('./routes/public/project'));
app.use('/private/project', require('./routes/private/project'));
app.use('/public/education', require('./routes/public/education'));
app.use('/private/education', require('./routes/private/education'));
app.use('/private/blog', require('./routes/private/blog'));
app.use('/public/blog', require('./routes/public/blog'));
app.use('/public/question', require('./routes/public/question'));
app.use('/private/question', require('./routes/private/question'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

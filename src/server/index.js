const express = require('express');
const os = require('os');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

var memberRouter = require('./routes/member');

const app = express();

//Connect to Database
mongoose.connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log('Database ready to use.');
        }
    }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('dist'));
app.use(cors());

app.use('/api/member', memberRouter);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = app;
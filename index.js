const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const trending = require('./routes/trending');
const search = require('./routes/search');
const movie = require('./routes/movie');
const tv = require('./routes/tv');
const person = require('./routes/person');
const auth = require('./routes/auth');
const user = require('./routes/user');

const allowedHost = process.env.ALLOWED_HOST || '*';

const corsOptions = {
    origin: function (origin, callback) {
        if (origin === allowedHost || !origin || allowedHost === '*') {
            callback(null, true);
        } else {
            console.error(`CORS Error: Origin ${origin} is not allowed. allowedHost: ${allowedHost}`);
            callback(new Error('CORS Error: Access denied. This origin is not allowed.'), false);
        }
    }
};

function customErrorHandler(err, req, res, next) {
    if (err.message.startsWith('CORS')) {
        return res.status(403).json({ error: err.message });
    }

    res.status(400).json({ error: 'An error occurred', details: err.message });
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server Available!' })
})

app.use('/auth', auth)
app.use('/user', user)
app.use('/trending', trending)
app.use('/search', search)
app.use('/movie', movie)
app.use('/tv', tv)
app.use('/person', person)

app.use(customErrorHandler);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 
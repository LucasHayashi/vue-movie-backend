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

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 
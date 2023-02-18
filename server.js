
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const postRouter = require('./routes/post-routers');
const contactRouter = require('./routes/contact-router');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = "mongodb+srv://aleksymalinowski21:nodepass1234@cluster0.dp5vlaz.mongodb.net/First-Example?retryWrites=true&w=majority";


mongoose.set("strictQuery", false);

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => console.log('Connected to DB'))
    .catch(error => console.log(error))


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${3000}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({extended: false}))

// app.use(express.static('styles')); // чтобы позволить браузеры читать файл со стилями

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
})



app.use(contactRouter)
app.use(postRouter)


app.use((req, res) => {
    const title = 'Error page';
    res
    .status(404)
    .render(createPath('error'), {title});
});


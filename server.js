
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = "mongodb+srv://aleksymalinowski21:aleksymalinowski@cluster0.dp5vlaz.mongodb.net/First-Example?retryWrites=true&w=majority";

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

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

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
})

app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    const contacts = [
        {name: 'Linkedin', link: "https://www.linkedin.com/in/aliaksei-malinouski-a44778249/"},
        {name: 'GitHub', link: "https://github.com/AliakseiMalinouski"}
    ]
    res.render(createPath('contacts'), {contacts, title});
})

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: 'Some large text for test',
        title: 'Post title',
        date: '99.99.9999',
        author: 'Aleksy'
    }
    res.render(createPath('post'), {title, post});
})

app.get('/posts', (req, res) => {
    const title = 'Posts';
    const posts = [
        {
            id: '1',
            text: 'Some large text for test',
            title: 'Post title',
            date: '99.99.9999',
            author: 'Aleksy'
        }
    ]
    res.render(createPath('posts'), {title, posts});
})
app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body;
    const post = {
        title, 
        author,
        text
    }
    res.render(createPath('post'), {post, title})
})

app.get('/add-post', (req, res) => {
    const title = 'Add Post';
    res.render(createPath('add-post'), {title});
})



app.use((req, res) => {
    const title = 'Error page';
    res
    .status(404)
    .render(createPath('error'), {title});
});


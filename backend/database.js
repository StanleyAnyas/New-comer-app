const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());


const mongoURI = 'mongodb://127.0.0.1:27017/church';
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
let db = null;

mongoose.connect(mongoURI, mongooseOptions)
    .then(() => {
        db = mongoose.connection;
    }
    )
    .catch(err => console.log(err));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: String,
    address: String
}, { collection: 'newComers' });

const newComers = mongoose.model('newComers', userSchema);

app.get('/newComers', (req, res) => {
    newComers.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/newComers', (req, res) => {
    const person = new newComers({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    });
    person.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.delete('/newComers/:id', (req, res) => {
    newComers.findByIdAndDelete(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.put('/newComers/:id', (req, res) => {
    newComers.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

// Path: backend\database.js


// example for postman
// {
//     "name": "John",
//     "age": 25,
//     "email": "john@gmail",
//     "phone": "123456789",
//     "address": "1234 Main St"    
// }

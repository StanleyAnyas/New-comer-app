const corsOptions = {
    origin: '*', // this work well to configure origin url in the server
    methods: 'GET, POST, PUT, DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
};
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors(corsOptions));
// app.UseCors((g)=>g.AllowAnyOrigin())
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    console.log("incoming request at " + new Date().toLocaleString());
    next();
  });

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
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    age: Number,
    email: String,
    phone: String,
    address: String
}, { collection: 'newComers' });

const newComers = mongoose.model('newComers', userSchema);

app.get('/newComers', (req, res) => {
    console.log("Recieved GET request")
    newComers.find({}) // 'name lastName age email phone address
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
        lastName: req.body.lastName,
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

app.get('/newComers/:id', (req, res) => {
    newComers.findById(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
})
app.put('/newComers/:id', (req, res) => {
    newComers.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
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
})

// const postNewComer = async (newComer) => {
//     try {
//         const response = await axios.post("http://localhost:3001/newComers", newComer, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (response.status === 200) {
//             return response.data; // Use response.data instead of response.json()
//         } else {
//             throw new Error("Something went wrong");
//         }
//     } catch (error) {
//         throw error;
//     }
// };


// const getAllNewComers = async () => {
//     try {
//         const response = await fetch("http://localhost:5000/newComers");
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error("Something went wrong");
//         }
//     } catch (error) {
//         throw error;
//     }
// };

// const deleteNewComer = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:5000/newComers/${id}`, {
//             method: "DELETE",
//         });
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error("Something went wrong");
//         }
//     } catch (error) {
//         throw error;
//     }
// };

// const updateNewComer = async (id, newComer) => {
//     try {
//         const response = await fetch(`http://localhost:5000/newComers/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newComer),
//         });
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error("Something went wrong");
//         }
//     } catch (error) {
//         throw error;
//     }
// };

// // Path: my-backend\components\AddNewComer.js
// module.exports = {
//     postNewComer,
//     // getAllNewComers,
//     // deleteNewComer,
//     // updateNewComer
// }   

// postman test
// GET
// http://localhost:5000/newComers
// POST
// http://localhost:5000/newComers
// {
//     "name": "John",
//     "lastName": "Doe",
//     "age": 30,
//     "email": "john.doe@gmail",
//     "phone": "0701234567",
//     "address": "Street 1"
// }
// POST
// http://localhost:5000/newComers
// {    
//     "name": "Jane",
//     "lastName": "Doe",
//     "age": 25,
//     "email": "jane.doe@gmail",
//     "phone": "0701234567",
//     "address": "Street 2"
// }   
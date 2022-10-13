const express = require("express")
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
//hashing
const bycrypt = require('bcrypt');

const cors = require('cors');


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://jdwyer6:hpYOr45SNY9s8jxq@cluster0.sv4ojpk.mongodb.net/time-tracker-data?retryWrites=true&w=majority')

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if(err) {
            res.json(err);
        }else{
            res.json(result)
        }
    })
})

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
})

app.post("/register", (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    bycrypt.hash(password, 10)
    .then((hash) => {
        const newUser = new UserModel({username, password: hash});
        newUser.save({
            username: username,
            password: hash
        }).then(() => {
            res.json("USER REGISTERED")
        }).catch((err) => {
            if(err){
                res.status(400).json({error: err});
            }
        })
    })
});

app.post("/login", (req, res) => {
    res.json("login");
})

app.get("/profile", (req, res) => {
    res.json("profile");
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
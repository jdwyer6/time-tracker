const express = require("express")
const app = express();
const mongoose = require('mongoose');
const Users = require('./models/Users');
//hashing
const bycrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const {createTokens, validateToken} = require('./JWT');
const cors = require('cors');


app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect('mongodb+srv://jdwyer6:hpYOr45SNY9s8jxq@cluster0.sv4ojpk.mongodb.net/time-tracker-data?retryWrites=true&w=majority')

// app.get("/getUsers", (req, res) => {
//     Users.find({}, (err, result) => {
//         if(err) {
//             res.json(err);
//         }else{
//             res.json(result)
//         }
//     })
// })

// app.post('/createUser', async (req, res) => {
//     const user = req.body;
//     const newUser = new Users(user);
//     await newUser.save();
//     res.json(user);
// })

app.post("/register", (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    bycrypt.hash(password, 10)
    .then((hash) => {
        const newUser = new Users({username, password: hash});
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

app.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({username: username})
    if(!user) res.status(400).json({error: "User doesn't exist"});

    const dbPassword = user.password
    bycrypt.compare(password, dbPassword).then((match) => {
        if(!match){
            res.status(400).json({error: "Oops...wrong username and password."})
        }else{
            const accessToken = createTokens(user)

            res.cookie("access-token", accessToken,{
                maxAge: 60*60*24*30*1000,
            })
            res.json("Logged In.");
        }
    })
    
})

app.get("/profile", validateToken, (req, res) => {
    res.json("profile");
    // res.render('../src/pages/DemoPage.js', {status: 'good'})
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
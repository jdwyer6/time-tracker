const express = require("express")
const app = express();
const mongoose = require('mongoose');
const Users = require('./models/Users');
//hashing
const bycrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const {createTokens, validateToken} = require('./JWT');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { current } = require("@reduxjs/toolkit");


app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect('mongodb+srv://jdwyer6:hpYOr45SNY9s8jxq@cluster0.sv4ojpk.mongodb.net/time-tracker-data?retryWrites=true&w=majority')

app.get("/getUsers", (req, res) => {
    Users.find({}, (err, result) => {
        if(err) {
            res.json(err);
        }else{
            res.json(result)
        }
    })
})


app.get('/user/:id', function(req, res){
    Users.findById(req.params.id)
    .then(userFound => {
        if(!userFound) { return res.status(404).end(); }
        return res.status(200).json(userFound)
    })
    .catch(err => next(err));
})

// app.post('/createUser', async (req, res) => {
//     const user = req.body;
//     const newUser = new Users(user);
//     await newUser.save();
//     res.json(user);
// })

app.post("/register", (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    const businessName = req.body.businessName;
    bycrypt.hash(password, 10)
    .then((hash) => {
        const newUser = new Users({username, password: hash, businessName});
        newUser.save({
            username: username,
            password: hash,
            businessName: businessName
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
    if(!user){
        res.status(400).json({error: "User doesn't exist"});
    }

    const dbPassword = user.password
    bycrypt.compare(password, dbPassword).then((match) => {
        if(!match){
            res.status(400).json({error: "Oops...wrong username and password."})
        }else{
            const accessToken = createTokens(user)
            res.statusCode = 200;
            res.cookie("access-token", accessToken,{
                maxAge: 60*60*24*30*1000,
            })
            const tempUser = {...user._doc, password: ''}
            res.json(tempUser);
        }
    })
        
})


app.post("/addEmployee", async (req, res) => {
    const {userId, name, pin, img, work} = req.body;
    const employeeId = uuidv4();
    await Users.findOneAndUpdate({
        userId: userId
    }, {
        $push: {
            employees: {employeeId: employeeId, name: name, pin: pin, img: img, work: work}
        }
    })
})


app.post('/updateEmployee/:id', function(req, res, next) {
    const {employeeId, info} = req.body;
    Users.findById(req.params.id)
    .then(user => {
        console.log(user)
        const currentEmployee = user.employees.find(employee => employee.employeeId == employeeId)
    
        if(user) {
            currentEmployee.work.push(info)
            console.log(currentEmployee)
            user.save()
            .then(user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user)
            })
            .catch(err => next(err));
        }else{
            err = new Error(`Could not update the employee with id ${employeeId}`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
})

app.get("/profile", validateToken, (req, res) => {
    res.json("profile");
    // res.render('../src/pages/DemoPage.js', {status: 'good'})
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
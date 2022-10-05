const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    start: {
        type: Number,
        required: false
    },
    end: {
        type: Number,
        required: false
    },
    startTime: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: false
    },
    hoursWorked: {
        type: Number,
        required: false
    }
},{
    timestamps: true
});


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    work: [WorkSchema]
},{
    timestamps: true
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
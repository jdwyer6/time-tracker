const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        data: Buffer,
        type: String
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    employees: {
        type: Array,
        required: false
    }
},{
    timestamps: true
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "please Enter Id"]
    },
    name: {
        type: String,
        required: [true, "please Enter name"]
    },
    email: {
        type: String,
        unique: [true, "email already exists"],
        required: [true, "please Enter unique email"],
        validate: validator.default.isEmail
    },
    photo: {
        type: String,
        required: [true, "please add photo"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, "please enter gender"]
    },
    dob: {
        type: Date,
        required: [true, "please enter date of birth"]
    }
}, {
    timestamps: true,
});
schema.virtual("age").get(function () {
    const currentDate = new Date();
    let age = currentDate.getFullYear() - this.dob.getFullYear();
    if (currentDate.getMonth() < this.dob.getMonth() || currentDate.getMonth() == this.dob.getMonth() && currentDate.getDate() < this.dob.getDate())
        age--;
    return age;
});
export const User = mongoose.model('User', schema);

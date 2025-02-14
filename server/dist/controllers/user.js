import { User } from "../models/user.js";
import mongoose from "mongoose";
import ErrorHandler from "../utils/utitlity-class.js";
import { TryCatch } from "../middleware/error.js";
export const newUser = TryCatch(async (req, res, next) => {
    try {
        const { name, email, photo, gender, _id, dob } = req.body;
        // Check for missing fields
        // console.log("👋",_id)
        // Create the user
        let user = await User.findById(_id);
        if (user) {
            return res.status(200).json({
                sucess: true,
                message: `welcome, ${user.name}`
            });
        }
        const missingFields = [];
        if (!name)
            missingFields.push("name");
        if (!email)
            missingFields.push("email");
        if (!gender)
            missingFields.push("gender");
        if (!_id)
            missingFields.push("ID (_id)");
        if (!dob)
            missingFields.push("date of birth (dob)");
        // If there are missing fields, respond with a 405 error
        if (missingFields.length > 0) {
            return next(new ErrorHandler(`Missing fields: ${missingFields.join(", ")}`, 405));
        }
        user = await User.create({
            name,
            email,
            photo,
            gender,
            _id,
            dob: new Date(dob),
        });
        // Send success response
        return res.status(200).json({
            success: true,
            message: `User created successfully: Welcome, ${user.name}`,
        });
    }
    catch (error) {
        // Handle specific error cases using ErrorHandler
        // Handle duplicate key error (e.g., email or _id already exists)
        if (error.code === 11000) {
            return next(new ErrorHandler("Duplicate entry: A user with this email or ID already exists.", 409));
        }
        // Handle invalid object ID errors (MongoDB)
        if (error instanceof mongoose.Error.CastError) {
            return next(new ErrorHandler(`Invalid ID format`, 400));
        }
        // Handle validation errors (schema validation)
        if (error instanceof mongoose.Error.ValidationError) {
            return next(new ErrorHandler(`validation error input all fields properly `, 400));
        }
        // Handle any other unexpected errors
        return next(error);
    }
});
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res.status(201).json({
        success: true,
        users,
        message: `all users list sent sucessfully`
    });
});
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler(`No user found with id: ${id}`, 404));
    }
    return res.status(200).json({
        success: true,
        user,
        message: `user details sent sucessfully`
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler(`No user found with id: ${id}`, 404));
    }
    await User.deleteOne({});
    return res.status(200).json({
        success: true,
        user,
        message: `user deleted sucessfully`
    });
});

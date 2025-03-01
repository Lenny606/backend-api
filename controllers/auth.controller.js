import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../env.js";

export const signUp = async (req, res, next) => {
//db transaction session
    const session = await mongoose.startSession()
    session.startTransaction();

    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email})

        if (existingUser) {
            const err = new Error(`User ${username} already exists`)
            err.status = 409;
            throw err
        }

        //hash pass
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        //create new user
        const newUser = await User.create([{username, email, password: hashedPass}], {session})

        //jwt
        const token = jwt.sign({id: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        //end session transaction
        await session.commitTransaction();
        session.endSession();

        //response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser
            }

        })

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err)
    }
}

export const signIn = async (req, res, next) => {
}

export const signOut = async (req, res, next) => {
}
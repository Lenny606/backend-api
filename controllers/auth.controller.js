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

    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email }).select('+password');
console.log(user);
        if (!user) {
            const err = new Error(`User not found`)
            err.status = 404;
            throw err
        }

        //security check
        const isValid = await User.correctPassword(password, user.password)
        if (!isValid) {
            const err = new Error(`User has invalid password`)
            err.status = 401;
            throw err
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})


        //response
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: user
            }

        })

    } catch (err) {

        next(err)
    }
}

export const signOut = async (req, res, next) => {
}
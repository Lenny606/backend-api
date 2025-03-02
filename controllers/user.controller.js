import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create new user
export const createUser = async (req, res, next) => {
    const { username, email, password, firstName, lastName, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
    });

    if (existingUser) {
        return next(new Error('User already exists with that email or username', 400));
    }

    // Create new user
    const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        role
    });

    // Remove password from output
    user.password = undefined;

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

export const getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        data: { users }
    });
};

// Get single user by ID
export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
        return next(new Error('User not found', 404));
    }

    res.status(200).json({
        success: true,
        data: { user }
    });
};

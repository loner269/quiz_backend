import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';


export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, secret);   
    } catch (error) {
        return null;
    }
};


export const registerUser = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const exsitingUser = await User.findOne({ email });
        if (exsitingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        // res.status(201).json({ message: 'User registered successfully' });
   res.status(201).json({
    message: 'User registered successfully',
     _id: user._id,
     username: user.username,
     email: user.email,
     token: generateToken(User._id),
   });

        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        
    } 
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const adminRegister = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const exsitingUser = await User.findOne({ email });
        if (exsitingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            name,
            email,
            role: 'admin',
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'Admin user registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
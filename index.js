import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './route/userRoute.js';
import questionRoutes from './route/questionRoutes.js';
import resultRoutes from './route/resultRoutes.js';
import leaderboardRoutes from './route/leaderboardRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes)
app.use('/api/results', resultRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

mongoose.connect(MONGODB_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App Backend!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
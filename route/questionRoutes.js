import express from 'express';
import { 
    getQuestionsByCategoryAndDifficulty,
    getAllQuestions
    
} from '../controller/questionController.js';


const router = express.Router();


router.get('/all', getAllQuestions);
router.get('/', getQuestionsByCategoryAndDifficulty);


export default router;
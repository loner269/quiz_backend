import express from 'express'
import { addQuestion, deleteQuestion, updateQuestion } from '../controller/adminController.js';
import admin from '../middleware/admin.js';

const router = express.Router();
router.post('/add',admin, addQuestion);
router.delete("/:id", admin, deleteQuestion);
router.put("/:id", admin, updateQuestion);

export default router;
import express from 'express';
import { registerUser, loginUser , adminRegister, autoLogin} from '../controller/authControler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/register', adminRegister);
router.get("/me", protect, autoLogin);
export default router;
import express from 'express';
import { registerUser, loginUser , adminRegister} from '../controller/authControler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/register', adminRegister);
// router.get("/me", protect, autoLogin);
router.get("/me", protect, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
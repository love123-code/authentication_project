import express from 'express';
import { register } from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', register);
// TODO: Implement verifyEmail, login, forgotPassword, resetPassword in controller
// userRouter.get('/verify', verifyEmail);
// userRouter.post('/login', login);
// userRouter.post('/forgot-password', forgotPassword);
// userRouter.post('/reset-password', resetPassword);

userRouter.get("/protected", authenticate, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

userRouter.get("/only-admin", authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: "This is an admin-only route", user: req.user });
});

export default userRouter;   

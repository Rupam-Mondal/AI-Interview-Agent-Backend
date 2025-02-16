import express from 'express';
import { SignUpController } from '../Controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.post('/Signup', SignUpController);

export default UserRouter;
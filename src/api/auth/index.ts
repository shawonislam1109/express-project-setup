import { Router } from 'express';
import * as authController from './auth.controller';
import validate from '../../middleware/validate';
import { registerSchema, loginSchema } from './auth.validation';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refreshTokens);
router.post('/logout', authController.logout);

export default router;

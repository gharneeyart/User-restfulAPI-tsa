import express from 'express';
import { getHome, getGoogleAuth, getGoogleCallback, getProfile, getLogout } from '../controller/passport.js';
import { ensureAuthenticated } from '../middlewares/passport.js';

const router = express.Router();

router.get('/', getHome);
router.get('/auth/google', getGoogleAuth);
router.get('/auth/google/callback', getGoogleCallback);
router.get('/profile', ensureAuthenticated, getProfile);
router.get('/logout', getLogout);

export default router;

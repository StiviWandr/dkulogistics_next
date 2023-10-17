import express from "express"
import userController from "../controllers/user-contoller.js";
import {body} from 'express-validator'
import authMiddleware from "../middlewares/auth-middleware.js";
import { upload } from "../config/multerConfig.js";
import articleController from "../controllers/article-controller.js";
import journalController from "../controllers/journal-controller.js";
const router = express.Router();

router.post( '/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    userController.registration
);
router.post( '/login', userController.login);
router.post( '/logout', userController.logout);

router.get( '/activate/:link', userController.activate);
router.get( '/refresh', userController.refresh);
router.get( '/users', authMiddleware, userController.getUsers);

router.post('/articles/upload', articleController.uploadArticle);
router.post('/articles/request', upload.single('file'), articleController.articleRequest);

router.get('/journals', journalController.getJournals)
router.post('/journals/create', journalController.createJournal);
export default router;
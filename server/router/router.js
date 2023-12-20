import express from "express"
import userController from "../controllers/user-contoller.js";
import {body} from 'express-validator'
import authMiddleware from "../middlewares/auth-middleware.js";
import permit from "../middlewares/role-permit-middleware.js";
import { uploadFileForArticle } from "../config/multerConfig.js";
import articleController from "../controllers/article-controller.js";

import journalController from "../controllers/journal-controller.js";
import reviewController from "../controllers/review-conntroller.js";
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
router.get( '/user/:id', [authMiddleware, permit('admin')], userController.getUser);
router.put( '/user/:id',  userController.editUser);
router.get('/articles/:id', articleController.getArticleById);
router.put('/articles/:id',[authMiddleware, permit('admin', 'reviewer')], articleController.updateArticleById);
router.get('/articles', [authMiddleware], articleController.getArticles);

router.post('/articles', [authMiddleware, uploadFileForArticle.array('files')], articleController.uploadArticle);
router.get('/user-articles', authMiddleware, articleController.getUserArticles);
router.get('/ongoing-articles', authMiddleware, articleController.getOngoingArticles);
router.get('/review-articles', [authMiddleware, permit('admin', 'reviewer')], articleController.getForReviewArticles);

router.post('/review', [authMiddleware, permit('admin', 'reviewer')], reviewController.addReview)

router.get('/journals', journalController.getJournals)
router.get('/journals/:id/articles', [authMiddleware], articleController.getJournalArticles);
router.post('/journals/create', authMiddleware, journalController.createJournal);
router.delete('/journals/:id', authMiddleware, journalController.deleteJournal);
export default router;

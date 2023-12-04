import ApiError from "../extensions/app-errors.js";
import articleService from "../services/article-service.js";
import tokenService from "../services/token-service.js";



class ArticleController {
    async getArticleById(req, res, next){
        try{
            const articleId = req.params.id;
            const article = await articleService.getArticle(articleId)
            return res.json(article)
        }catch(e){
            next(e);
        }
    }
    async updateArticleById(req, res, next){
        try{
            const articleId = req.params.id;
            const updateBody = req.body;
            const article = await articleService.updateArticle(articleId, updateBody)
            return res.json(article)
        }catch(e){
            next(e);
        }
    }
    async uploadArticle(req, res, next){
        try{
            const articleData = req.body;
            const articleFiles = req.files;
            const userData = req.user;
            const article = await articleService.uploadArticle(articleData, articleFiles, userData)
            return res.json(article)
        }catch(e){
            next(e);
        }
    }
    async getArticles(req, res, next){
        try{
            const articles = await articleService.getArticles(req)
            return res.json(articles)
        }catch(e){
            next(e);
        }
    }
    async getUserArticles (req, res, next) {
        try{
            const userData = req.user;
            const articles = await articleService.getUserArticles(userData.id)
            return res.json(articles)
        }catch(e){
            next(e);
        }
    }
    async getForReviewArticles (req, res, next) {
        try{
            const articles = await articleService.getArticlesForReview()
            return res.json(articles)
        }catch(e){
            next(e);
        }
    }
}

const articleController = new ArticleController;
export default articleController;
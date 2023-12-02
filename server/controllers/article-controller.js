import articleService from "../services/article-service.js";



class ArticleController {
    async uploadArticle(req, res, next){
        try{
            const articleData = req.body;
            const articleFiles = req.files;
            
            const article = await articleService.uploadArticle(articleData, articleFiles)
            return res.json(article)
        }catch(e){
            next(e);
        }
    }
    async articleRequest(req, res, next){
        try{
            const articleData = req.body;
            const articleFile = req.file;
            const articleFileName = req.files.filename;
            // const article = await mailService.sendArticleMail("artur03rodnov@gmail.com", {
            //     authors:articleData.annotation,
            //     title: articleData.title,
            //     annotation: articleData.annotation,
            //     fileName: articleFileName
            // })
            return res.json(article)
        }catch(e){
            next(e)
        }
    }
}

const articleController = new ArticleController;
export default articleController;

import * as dotenv from "dotenv"
import Article from "../models/Article.js";
dotenv.config()
class ArticleService{
    async uploadArticle(reqData, reqFile){
        const data = reqData;
        const article = await Article.create({
            author: data.author,
            title: data.title,
            annotation: data.annotation,
            articleFile: reqFile,
            journalId: data.journalId

        })
        return article;
    }
   
}
const articleService = new ArticleService();

export default articleService;
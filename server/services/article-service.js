
import * as dotenv from "dotenv"
import Article from "../models/Article.js";
import ApiError from "../extensions/app-errors.js";
dotenv.config()
class ArticleService{
    async uploadArticle(reqData, reqFiles, reqAuthors){
        const data = reqData;
        if (!reqFiles || reqFiles.length === 0) {
            throw new ApiError(400, 'Нет файлов для загрузки или файлы имеют недопустимый формат');
        }
        const article = await Article.create({
            authors: reqAuthors,
            name: data.name,
            annotation: data.annotation,
            files: reqFiles,
            journalId: data.journalId,
        })
        return article;
    }
   
}
const articleService = new ArticleService();

export default articleService;
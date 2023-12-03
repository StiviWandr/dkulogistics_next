
import * as dotenv from "dotenv"
import Article from "../models/Article.js";
import ApiError from "../extensions/app-errors.js";
import User from "../models/User.js";
import userService from "./user-service.js";
dotenv.config()

class ArticleService{
    async getArticle (id){
        const article = await Article.findById(id);
        return article;
    }
    async updateArticle (id, articleUpdates){
        const updatedArticle = await Article.findByIdAndUpdate(id, articleUpdates, { new: true });
        
        if (!updatedArticle) {
            return new ApiError.BadRequest("Статьи с таким id нет в базе");
        }

        return updatedArticle
    }
    async uploadArticle(reqData, reqFiles, userData){
        const data = reqData;
        if (!reqFiles || reqFiles.length === 0) {
            throw new ApiError(400, 'Нет файлов для загрузки или файлы имеют недопустимый формат');
        }
        const article = await Article.create({
            authors: parseAuthors(reqData),
            keywords: data.keywords,
            name: data.name,
            sender: userData.id,
            annotation: data.annotation,
            files: reqFiles,
            journalId: data.journalId,
        })
        return article;
    }
    async getUserArticles(userId){
        const articles = await Article.find({sender: userId})
        return articles;
    }
    async getArticlesForReview(){
        const articles = await Article.find(
            // {status: { $in: ['onReview', 'pending'] }}
        ).sort({ created_at: 1 });
        return articles;
    }
   
}
const articleService = new ArticleService();

export default articleService;


export function parseAuthors(data) {
    const authors = {};

    Object.keys(data).forEach((key) => {
        // Проверяем, содержит ли ключ указание на автора
        if (key.startsWith('authors[')) {
            // Получаем индекс и свойство из ключа
            const match = key.match(/^authors\[(\d+)\]\.(.+)$/);
            if (match) {
                const index = match[1];
                const property = match[2];

                if (!authors[index]) {
                    authors[index] = {};
                }

                authors[index][property] = data[key];
            }
        }
    });

    // Возвращаем массив объектов авторов
    return Object.values(authors);
}
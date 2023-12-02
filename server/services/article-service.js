
import * as dotenv from "dotenv"
import Article from "../models/Article.js";
import ApiError from "../extensions/app-errors.js";
dotenv.config()

class ArticleService{
    async uploadArticle(reqData, reqFiles){
        const data = reqData;
        if (!reqFiles || reqFiles.length === 0) {
            throw new ApiError(400, 'Нет файлов для загрузки или файлы имеют недопустимый формат');
        }
        const article = await Article.create({
            authors: parseAuthors(reqData),
            keywords: data.keywords,
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

                // Если автора с таким индексом еще нет, создаем новый объект
                if (!authors[index]) {
                    authors[index] = {};
                }

                // Добавляем информацию о свойстве автора
                authors[index][property] = data[key];
            }
        }
    });

    // Возвращаем массив объектов авторов
    return Object.values(authors);
}
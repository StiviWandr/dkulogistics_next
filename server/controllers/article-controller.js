import articleService from "../services/article-service.js";


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
class ArticleController {
    async uploadArticle(req, res, next){
        try{
            const articleData = req.body;
            const articleFiles = req.files;
            const authorsArray = parseAuthors(req.body);
            const article = await articleService.uploadArticle(articleData, articleFiles, authorsArray)
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
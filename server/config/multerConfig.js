import pathConfig from './pathConfig.js';
import multer from 'multer';
import {nanoid} from "nanoid";
import * as path from 'path';
import ApiError from '../extensions/app-errors.js';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathConfig.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
})
const fileFilter = (req, file, cb) => {
    // Разрешенные расширения файлов
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new ApiError(400, 'Недопустимый тип файла'), false);
    }
};

export const upload = multer({storage})

export const uploadFileForArticle = multer({ storage: storage, fileFilter: fileFilter });
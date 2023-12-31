import * as path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = __dirname;

console.log(path.join(rootPath, '../public/uploads'));

export default {
    rootPath,
    uploadPath: path.join(rootPath, '../public/uploads'),
}


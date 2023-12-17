export function decodeString(str: string) {
    try {
        // Попытка декодировать строку
        return decodeURIComponent(escape(str));
    } catch (error) {
        console.error('Ошибка при декодировании строки:', error);
        return str; 
    }
}



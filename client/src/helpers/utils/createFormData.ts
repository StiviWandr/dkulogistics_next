export function createFormData(dataObject: any): FormData {
    const formData = new FormData();

    Object.entries(dataObject).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    // Если элемент массива является объектом, обработайте его ключи
                    Object.entries(item).forEach(([innerKey, innerValue]) => {
                        formData.append(`${key}[${index}][${innerKey}]`, innerValue as string);
                    });
                } else {
                    // Если элемент массива не является объектом, добавьте его напрямую
                    formData.append(`${key}[]`, item as string);
                }
            });
        } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
            // Если значение является объектом и не файлом, добавляем его как JSON строку
            formData.append(key, JSON.stringify(value));
        } else {
            // Для простых типов данных просто добавляем значение как есть
            formData.append(key, value as string | Blob);
        }
    });

    return formData;
}
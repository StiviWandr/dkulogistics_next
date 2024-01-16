export const API_CONFIG = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    IMAGES_URL: process.env.NEXT_PUBLIC_IMAGES_URL
}

export const locales = ['ru', 'kk'] as const;
export const apiUrl = API_CONFIG.API_URL
export const apiImageStorage = API_CONFIG.IMAGES_URL
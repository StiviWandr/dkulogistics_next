import { Config } from "next-i18n-router/dist/types";

const i18nConfig: Config = {
    locales: ['en', 'kz', 'ru'],
    defaultLocale: 'ru',
    routingStrategy: 'dynamicSegment'
}
  
export default i18nConfig;
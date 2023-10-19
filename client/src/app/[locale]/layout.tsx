import { Header } from '@/UI/Header/Header'
import '@/app/globals.css'
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import { Footer } from '@/UI/Footer/Footer'
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/Modules/TranslationProvider/TranslationProvider'
import initTranslations from '../i18n'
import AuthModal from '@/UI/Modals/AuthModal/AuthModal'


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale:any) => ({ locale }));
}   

export default async function LocaleLayout({children, params: {locale}}: any) {
    const { t, options } = await initTranslations(locale, ['home']);
    
    return (
        <TranslationsProvider namespaces={options.ns} locale={locale}>
           
            <div className='wrapper'>
                <Header locale={locale}/>
                <main className='main'>
                    {children}
                </main>
                <Footer locale={locale}></Footer>
                <AuthModal />
            </div>
        </TranslationsProvider>
    )
}

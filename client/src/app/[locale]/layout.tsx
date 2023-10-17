import { Header } from '@/UI/Header/Header'
import '@/globals.css'
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import { Footer } from '@/UI/Footer/Footer'
import { ReduxProvider } from '@/Store/ReduxProvider'
import {notFound} from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/Modules/TranslationProvider/TranslationProvider'


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale:any) => ({ locale }));
}   

export default  function LocaleLayout({children, params: {locale}}: any) {
    
    return (
        <TranslationsProvider>
            <main className='main'>
                {children}
            </main>
        </TranslationsProvider>
    )
}

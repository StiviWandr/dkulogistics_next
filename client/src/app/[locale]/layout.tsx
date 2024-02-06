import { Header } from '@/UI/Header/Header'
import './reset.css'
import './globals.css'
import type { Metadata } from 'next'

import { Footer } from '@/UI/Footer/Footer'

import AuthModal from '@/UI/Modals/AuthModal/AuthModal'
import { ConfigProvider } from 'antd'
import ToastWrapper from '@/UI/ToastWrapper/ToastWrapper'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { ReduxProvider } from '@/Store/ReduxProvider'

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}

const montserrat = Montserrat({ 
    subsets: ['latin'],
    variable: "--font-mont"
})
export default async function LocaleLayout({children, params: {locale}}: any) {
    let messages

    try {
       messages = (await import(`../../../locales/${locale}.json`)).default
    } catch (error) {
        notFound()   
    }
    return (
        <html lang={locale}>
            <body>
                <div className={montserrat.className}>
                    <ReduxProvider>
                        <NextIntlClientProvider locale={locale} messages={messages}>
                           <ConfigProvider locale={locale}>
                                <div className='wrapper'>
                                    <Header locale={locale}/>
                                    <main className='main'>
                                        {children}
                                    </main>
                                    <Footer locale={locale}></Footer>
                                    <AuthModal locale={locale}/>
                                    <ToastWrapper/>
                                </div>
        
                           </ConfigProvider>
        
                        </NextIntlClientProvider>
                    </ReduxProvider>
                </div>
            </body>
            
        </html>
        
    )
}

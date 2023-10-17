'use client'
import { Header } from '@/UI/Header/Header'
import '@/globals.css'
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import { Footer } from '@/UI/Footer/Footer'
import { ReduxProvider } from '@/Store/ReduxProvider'
import {notFound} from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl/client'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}
export function generateStaticParams() {
    return [{locale: 'en'}, {locale: 'de'}];
  }
   
  export default async function LocaleLayout({children, params: {locale}}: any) {
    let messages;
    try {
      messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
      notFound();
    }
   
    return (
        <html lang={'ru'}>
            <body className={montserrat.className}>
                <ReduxProvider>
                    <div className='wrapper'>
                        <Header />
                        <main className='main'>
                        <NextIntlClientProvider locale={locale} messages={messages}>
                            {children}
                        </NextIntlClientProvider>
                        </main>
                        <Footer></Footer>
                    </div>
                </ReduxProvider>
            </body>
        </html>
    )
}

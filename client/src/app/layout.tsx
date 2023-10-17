import { Header } from '@/UI/Header/Header'
import '@/globals.css'
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import { Footer } from '@/UI/Footer/Footer'
import { ReduxProvider } from '@/Store/ReduxProvider'
import {notFound} from 'next/navigation';
// import i18nConfig from '@/i18nConfig';


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}

// export function generateStaticParams() {
//   return i18nConfig.locales.map((locale:any) => ({ locale }));
// }   
  export default  function RootLayout({children, params: {locale}}: any) {
    
    return (
        <html>
            <body className={montserrat.className}>
                <ReduxProvider>
                    <div className='wrapper'>
                        <Header />
                        <main className='main'>
                            {children}
                        </main>
                        <Footer></Footer>
                    </div>
                </ReduxProvider>
            </body>
        </html>
    )
}

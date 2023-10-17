import { Header } from '@/UI/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Footer } from '@/UI/Footer/Footer'
import { ReduxProvider } from '@/Store/ReduxProvider'


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}
  
export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang={'ru'}>
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

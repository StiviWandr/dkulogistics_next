import '@/app/reset.css'
import '@/app/globals.css'

import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import { ReduxProvider } from '@/Store/ReduxProvider'

const montserrat = Montserrat({ 
    subsets: ['latin'],
    variable: "--font-mont"
 })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}
export const revalidate = 70

export default  function RootLayout({children, params: {locale}}: any) {
    
    return (
        <html className={montserrat.className}>
            <body >
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    )
}

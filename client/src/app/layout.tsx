import '@/app/globals.css'
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'
import { ReduxProvider } from '@/Store/ReduxProvider'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}
 
  export default  function RootLayout({children, params: {locale}}: any) {
    
    return (
        <html>
            <body className={montserrat.className}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    )
}

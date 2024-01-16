
import '@/app/reset.css'
import '@/app/globals.css'

import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}
export const revalidate = 70

export default  function RootLayout({children, params: {locale}}: any) {
    
    return (
        <> 
            {children}
        </>
    )
}

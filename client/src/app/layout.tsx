import { Header } from '@/UI/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header></Header>
                <main>
                    {children}
                </main>
                </body>
        </html>
    )
}

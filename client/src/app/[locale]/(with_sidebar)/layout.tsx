
import type { Metadata } from 'next'
import styles from './layout.module.css'
import { InfoSidebar } from '@/UI/InfoSidebar/InfoSidebar'
import { Container } from '@/UI/Container/Container'

export const metadata: Metadata = {
    title: 'DKU - логистика',
    description: 'Журнал по всем тема в мире логистика от Универстита КНУ',
}


export default async function SidebarLayout({children, params: {locale}}: any) {
    return (
        <Container>
            <div className={styles.layout}>
                <div className={styles.main}> 
                    {children}          
                </div>
                <div className={styles.sidebar}> 
                    <InfoSidebar/>        
                </div>
            </div>
        </Container>
        
        
    )
}

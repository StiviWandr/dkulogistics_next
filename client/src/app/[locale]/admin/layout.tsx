import { Container } from '@/UI/Container/Container'
import styles from "./page.module.css"
import { AccountNavigation } from '@/Modules/Account/AccountNavigation/AccountNavigation.module'
import { AdminNavigation } from '@/Modules/Admin/AccountNavigation/AdminNavigation'

export default async function LocaleLayout({children, params: {locale}}: any) {
    
    
    return (
        <>
        
            <Container>
                <div className={styles.account_wrapper}>
                    <AdminNavigation locale={locale}/>
                    {children}
                </div>
            </Container>
        
            
        </>
    )
}

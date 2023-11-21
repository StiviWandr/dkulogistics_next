import { Container } from '@/UI/Container/Container'
import styles from "./page.module.css"
import { AccountNavigation } from '@/Modules/Account/AccountNavigation/AccountNavigation.module'

export default async function LocaleLayout({children, params: {locale}}: any) {
    
    
    return (
        <>
        
            <Container>
                <div className={styles.account_wrapper}>
                    <AccountNavigation locale={locale}/>
                    {children}
                </div>
            </Container>
        
            
        </>
    )
}

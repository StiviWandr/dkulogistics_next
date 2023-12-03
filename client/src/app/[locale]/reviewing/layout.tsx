import { Container } from '@/UI/Container/Container'
import styles from "./page.module.css"
import { AccountNavigation } from '@/Modules/Account/AccountNavigation/AccountNavigation.module'
import { ReviewNavigtation } from '@/Modules/Reviewing/ReviewNavigtation/ReviewNavigtation'

export default async function LocaleLayout({children, params: {locale}}: any) {
    return (
        <>
        
            <Container>
                <div className={styles.account_wrapper}>
                    <ReviewNavigtation locale={locale}/>
                    {children}
                </div>
            </Container>
        </>
    )
}

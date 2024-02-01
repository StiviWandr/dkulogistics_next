import { AboutJournal } from "@/Modules/HomePage/AboutJournal/AboutJournal";
import { Promo } from "@/Modules/HomePage/Promo/Promo";
import styles from './page.module.css'
import { Container } from "@/UI/Container/Container";
import { InfoSidebar } from "@/UI/InfoSidebar/InfoSidebar";
export default function Home({ params: { locale } }: any) {
    
    return (
        <>
            <Promo locale={locale}/> 
            <Container>
                <div className={styles.layout}>
                    <div className={styles.main}> 
                        
                        <AboutJournal locale={locale}/>     
                    </div>
                    <div className={styles.sidebar}> 
                        <InfoSidebar/>        
                    </div>
                </div>
            </Container>
        </>
    )
}

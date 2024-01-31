
import { Container } from '../Container/Container';
import styles from './Footer.module.css'
import { FooterColumn } from './FooterColumn/FooterColumn';
import { Text16 } from '../TextSizes/Text16/Text16';
import { Text20 } from '../TextSizes/Text20/Text20';
import Link  from 'next/link';

interface IFooterProps {
    locale: string
}

export async function Footer (props: IFooterProps) {
   
    
    return (
        <footer className={styles.wrapper}>
            <Container>
                <div className={styles.footer}>
                    <FooterColumn
                        title={'Контакты'}
                    >
                        <Text16>+7-(727)-355-05-51 (Вн. 218)</Text16>
                        
                        <Link className={styles.link} href={'mailto:logscm@dku.kz'}>
                            <Text16>logscm@dku.kz</Text16>
                        </Link>
                    </FooterColumn>
                    <FooterColumn
                        title={"Дополнительно"}
                    >
                        <Link className={styles.link} href={'https://dku.kz'}>
                            <Text16>{"Страница университета"}</Text16>
                        </Link>
                    </FooterColumn>
                </div>
            </Container>
            <div className={styles.copyright}>
                <Container>
                    <Text20>© 2023 Deutsch-Kasachische Universität</Text20>
                </Container>
            </div>
        </footer>
    );
}
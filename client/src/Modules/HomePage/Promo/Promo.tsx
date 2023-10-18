import { Text32 } from '@/UI/TextSizes/Text32/Text32';
import styles from './Promo.module.css'
import initTranslations from '@/app/i18n';
import { Container } from '@/UI/Container/Container';
interface IPromoProps {
    locale: any
}

export async function Promo (props: IPromoProps) {
    const {t} = await initTranslations(props.locale, ['homepage']);
    
    return (
        <div className={styles.promo}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.maintitle}>
                        <Text32>{t('about.title')}</Text32>

                    </div>
                </div>
                
            </Container>
        </div>
    );
}
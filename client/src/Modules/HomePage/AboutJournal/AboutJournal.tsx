import { Text32 } from '@/UI/TextSizes/Text32/Text32';
import styles from './AboutJournal.module.css'

import { Container } from '@/UI/Container/Container';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import Image from 'next/image';
import JournalImage from '@/assets/images/journal.png'
import Link from 'next/link';
import { Text16 } from '@/UI/TextSizes/Text16/Text16';
import { useTranslations } from 'next-intl';
interface IAboutJournalProps {
    locale: any
}

export  function AboutJournal (props: IAboutJournalProps) {
    const t = useTranslations('Главная')
    return (
        <div className={styles.about}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <Text32>{t('О журнале')}</Text32>
                        <Text20>{t('Описание')}</Text20>
                        <Link className={styles.link} href={`/${props.locale}/about`}>
                            <Text16>
                                {t("Читать далее")}
                            </Text16>
                        </Link>
                    </div>
                    <div className={styles.img}>
                        <Image
                            height={300}
                            alt='Journal'
                            // placeholder="blur"
                            src={JournalImage}
                            style={{border: '1px solid grey'}}
                        />
                    </div>
                </div>
                
            </Container>
        </div>
    );
}
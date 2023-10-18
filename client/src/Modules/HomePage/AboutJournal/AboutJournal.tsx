import { Text32 } from '@/UI/TextSizes/Text32/Text32';
import styles from './AboutJournal.module.css'
import initTranslations from '@/app/i18n';
import { Container } from '@/UI/Container/Container';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import Image from 'next/image';
import JournalImage from '@/assets/images/journal_example.svg'
import Link from 'next/link';
import { Text16 } from '@/UI/TextSizes/Text16/Text16';
interface IAboutJournalProps {
    locale: any
}

export async function AboutJournal (props: IAboutJournalProps) {
    const {t} = await initTranslations(props.locale, ['homepage']);
    
    return (
        <div className={styles.about}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <Text32>{t('about.title')}</Text32>
                        <Text20>{t('about.text')}</Text20>
                        <Link className={styles.link} href={`/${props.locale}/about`}>
                            <Text16>
                                {t('about.link')}
                            </Text16>
                        </Link>
                    </div>
                    <div className={styles.img}>
                        <Image
                            width={416}
                            alt='Journal'
                            // placeholder="blur"
                            src={JournalImage}
                        />
                    </div>
                </div>
                
            </Container>
        </div>
    );
}
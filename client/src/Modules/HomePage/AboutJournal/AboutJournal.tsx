import { Text32 } from '@/UI/Text32/Text32';
import styles from './AboutJournal.module.css'
import { useTranslations } from 'next-intl';

interface IAboutJournalProps {
    lang: any
}

export async function AboutJournal (props: IAboutJournalProps) {
    const t = useTranslations('pages')
    return (
        <div>
            <Text32>{t('home.about')}</Text32>
        </div>
    );
}
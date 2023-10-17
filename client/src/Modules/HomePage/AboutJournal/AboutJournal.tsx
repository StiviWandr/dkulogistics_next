import { Text32 } from '@/UI/Text32/Text32';
import styles from './AboutJournal.module.css'
import { useTranslations } from 'next-intl';
import initTranslations from '@/app/i18n';

interface IAboutJournalProps {
    lang: any
}

export async function AboutJournal (props: IAboutJournalProps) {
    const {t} = await initTranslations(props.lang, ['header']);
    
    return (
        <div>
            <Text32>{t('home')}</Text32>
        </div>
    );
}
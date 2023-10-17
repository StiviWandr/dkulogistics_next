import { Text32 } from '@/UI/Text32/Text32';
import styles from './AboutJournal.module.css'

interface IAboutJournalProps {
    lang: any
}

export async function AboutJournal (props: IAboutJournalProps) {

    return (
        <div>
            <Text32>О журнале</Text32>
        </div>
    );
}
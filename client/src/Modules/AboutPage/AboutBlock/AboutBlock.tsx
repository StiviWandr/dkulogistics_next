import styles from './AboutBlock.module.css'
import { Text24 } from '@/UI/TextSizes/Text24/Text24';

export interface IAboutBlockProps {
    children: React.ReactNode,
    title: string
}

export function AboutBlock (props: IAboutBlockProps) {
    return (
        <div className={styles.about}>
            <h2 className={styles.title}><Text24>{props.title}</Text24></h2>

            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
}

import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import styles from './FooterColumn.module.css'

interface IFooterColumnProps {
    title: string,
    children: React.ReactNode
}

export function FooterColumn (props: IFooterColumnProps) {
    return (
        <>
            <div className={styles.column}>
                <div className={styles.title}>
                    <Text20>
                        {props.title}
                    </Text20>
                </div>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </>
    );
}
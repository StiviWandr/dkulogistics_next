import styles from './Text16.module.css'
import { Montserrat } from 'next/font/google';
interface IText16Props {
    children: React.ReactNode
}
const montserrat = Montserrat({ subsets: ['latin'] })
export function Text16 (props: IText16Props) {
    return (
        <p className={styles.text + montserrat.className}>
            {props.children}
        </p>
    );
}
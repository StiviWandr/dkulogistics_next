import styles from './Text16.module.css'
interface IText16Props {
    children: React.ReactNode
}
export function Text16 (props: IText16Props) {
    return (
        <div className={styles.text}>
            {props.children}
        </div>
    );
}
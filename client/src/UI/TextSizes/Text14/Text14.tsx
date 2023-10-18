import styles from './Text14.module.css'
interface IText14Props {
    children: React.ReactNode
}
export function Text14 (props: IText14Props) {
    return (
        <div className={styles.text}>
            {props.children}
        </div>
    );
}
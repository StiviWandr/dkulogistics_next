import styles from './Text20.module.css'

interface IText20Props {
    children: React.ReactNode
}

export function Text20 (props: IText20Props) {
    return (
        <div className={styles.text}>
            {props.children}
        </div>
    );
}
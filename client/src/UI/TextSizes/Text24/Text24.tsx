import styles from './Text24.module.css'

interface IText24Props {
    children: React.ReactNode
}

export function Text24 (props: IText24Props) {
    return (
        <div className={styles.text}>
            {props.children}
        </div>
    );
}
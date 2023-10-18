import styles from './Text32.module.css'

interface IText32Props {
    children: React.ReactNode
}

export function Text32 (props: IText32Props) {
    return (
        <div className={styles.text}>
            {props.children}
        </div>
    );
}
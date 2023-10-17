import styles from './Container.module.css'

interface IContainerProps {
    children: React.ReactNode
}

export function Container (props: IContainerProps) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}
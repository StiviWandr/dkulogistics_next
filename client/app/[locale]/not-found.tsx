import styles from './loading.module.css'


export default function NotFound () {
    return (
        <div className={styles.placeholder}>
            <span>404 not-found</span>
        </div>
    );
}
import styles from './loading.module.css'


export default  function Loading () {
    return (
        <div className={styles.placeholder}>
            <div className={styles.book}>
	            <div className={styles.book__pg_shadow}></div>
	            <div className={styles.book__pg}></div>
	            <div className={styles.book__pg +" "+styles.book__pg__2}></div>
	            <div className={styles.book__pg +" "+styles.book__pg__3}></div>
	            <div className={styles.book__pg +" "+styles.book__pg__4}></div>
	            <div className={styles.book__pg +" "+styles.book__pg__5}></div>
            </div>
        </div>
    );
}
import styles from './ButtonYellow.module.css'
interface ButtonYellowProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}

export function ButtonYellow (props: ButtonYellowProps) {
    
    return(
        <button
            onClick={props.onClick}
            className={`${styles.button} ${props.className}`}
        >
            {props.children}
        </button>
    )
    
}
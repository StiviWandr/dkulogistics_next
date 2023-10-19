import styles from './ButtonOrange.module.css'
interface ButtonOrangeProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}

export function ButtonOrange (props: ButtonOrangeProps) {
    
    return(
        <button
            onClick={props.onClick}
            className={`${styles.button} ${props.className}`}
        >
            {props.children}
        </button>
    )
    
}
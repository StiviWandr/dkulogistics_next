import Link from "next/link"

interface ButtonOrangeProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}

export function ButtonOrange (props: ButtonOrangeProps) {
    return(
        <Link
            href={}
        >
            {props.children}
        </Link>
    )
    
}
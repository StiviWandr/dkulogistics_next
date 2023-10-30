import { InputHTMLAttributes } from "react";
import styles from "./FormInput.module.css"
import { RegisterOptions } from "react-hook-form"
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import { ErrorMessage } from "@hookform/error-message"
import { Montserrat } from 'next/font/google'
interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label?: string,
    rules? : RegisterOptions,
    errors?: any,
    register: (name: string, RegisterOptions?: RegisterOptions) => any
}


const FormInput = (props: IFormInputProps) => {
    return(
        <div className={styles.group}>
            <input 
                {...props.register(props.name, props.rules)}
                required={props.required}
                name={props.name} 
                id ={props.name}
                className = {styles.input} 
                type={props.type? props.type: 'text'} 
                placeholder={props.placeholder? props.placeholder : " "}>

            </input>
            {props.label? <label htmlFor={props.name} className={styles.label}><Text20>{props.label}</Text20></label>: null}
            {
                props.errors 
                && 
                <div className={styles.error}>
                    <ErrorMessage
                        errors={props.errors}
                        name={props.name}
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                
            }
        </div>
    )
}

export default FormInput;
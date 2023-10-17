import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    error: string
}

const Input = (props: IInputProps) => {
    return(
        <div className="group">
            <input 
                required={props.required}
                name={props.name} 
                id ={props.name} 
                value={props.value} 
                onChange={props.onChange} 
                className = "input" 
                type={props.type? props.type: 'text'} 
                placeholder={props.placeholder? props.placeholder : " "}>

            </input>
            {props.label? <label htmlFor={props.name} className="label">{props.label}</label>: null}
        </div>
    )
}

export default Input;
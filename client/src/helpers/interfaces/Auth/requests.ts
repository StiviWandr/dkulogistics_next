import { IRedirectAsync } from "../ApiInterfaces/asyncInterface"

export interface ILoginRequest extends IRedirectAsync {
    password: string,
    email: string
}


export interface IRegisterRequest {
    name: string,
    lastName: string,
    fathersName: string
    email:string,
    birthDay: string,
    password: string, 
    confirmPassword: string,
}
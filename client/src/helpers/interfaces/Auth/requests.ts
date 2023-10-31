import { IRedirectAsync } from "../ApiInterfaces/asyncInterface"

export interface ILoginRequest extends IRedirectAsync {
    password: string,
    email: string
}


export interface IRegisterRequest {
    name: string,
    vorname: string,
    lastname: string
    email:string,
    birthDay: string,
    password: string, 
    confirmPassword: string,
}

export interface ILoginRequest {
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
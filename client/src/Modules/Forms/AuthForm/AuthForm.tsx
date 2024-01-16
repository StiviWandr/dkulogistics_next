'use client'
import styles from './AuthForm.module.css'
import { useForm } from 'react-hook-form';
import FormInput from '@/UI/Form/FormInput/FormInput';
import { ButtonYellow } from '@/UI/Buttons/ButtonYellow/ButtonYellow';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import { useAppDispatch } from '@/helpers/hooks/redux';
import { login } from '@/Store/Slices/userSlice';
import { useRouter } from 'next/navigation';


interface IAuthFormProps {

}

export function AuthForm (props: IAuthFormProps) {
    
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { handleSubmit, register, trigger, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        dispatch(login({...data, router}))
    }
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <FormInput 
                    name="email" 
                    type='email' 
                    register={register} 
                    rules={{ 
                        required: `Это обязательное поле`, 
                        onBlur: ()=>trigger('email') 
                    }} 
                    label='Email'
                    errors={errors}
                />
                <FormInput 
                    name="password" 
                    type='password' 
                    register={register} 
                    rules={{ 
                        required: `Это обязательное поле`,
                        minLength: {
                            value: 8,
                            message: "Слишком короткий пароль"
                        },
                        onBlur: ()=>trigger('password') 
                    }} 
                    placeholder='Пароль'
                    errors={errors}
                />
                <ButtonYellow type='submit'><Text20>{"Войти"}</Text20></ButtonYellow>
            </form>
        </>
    );
}
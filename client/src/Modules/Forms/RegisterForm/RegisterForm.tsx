'use client'
import styles from './RegisterForm.module.css'
import { Controller, useForm } from 'react-hook-form';
import FormInput from '@/UI/Form/FormInput/FormInput';
import { ButtonYellow } from '@/UI/Buttons/ButtonYellow/ButtonYellow';

import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import { Text32 } from '@/UI/TextSizes/Text32/Text32';
import { FormDatePicker } from '@/UI/Form/FormDatePicker/FormDatePicker';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { registerUser } from '@/Store/Slices/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import isAuthenticated from '@/helpers/utils/authProtection';

export interface IRegisterFormProps {
}

export function RegisterForm (props: IRegisterFormProps) {
    
    const dispatch = useAppDispatch()
    const router = useRouter();
    const {token} = useAppSelector(state=>state.user)
    const { handleSubmit, register, getValues, setValue, trigger, formState: { errors }, control } = useForm();
    const onSubmit = (data: any) => {
        const reqData = {...data, birthDay: moment(data.birthDay).format('DD.MM.YYYY')}
        dispatch(registerUser({data: reqData, router}))
    }
    useEffect(()=> {
        if(token){
            router.push('/')
        }
    }, [router])
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Text32>
                    {'Регистрация'}
                </Text32>
                <FormInput 
                    name="name"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: `Это обязательное поле`, 
                        onBlur: ()=>trigger('name') 
                    }} 
                    label='Имя*'
                    errors={errors}
                />
                <FormInput 
                    name="lastName"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: false
                    }} 
                    label='Фамилия'
                    errors={errors}
                />
                <FormInput 
                    name="fathersName"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: `Это обязательное поле`, 
                        onBlur: ()=>trigger('lastName') 
                    }} 
                    label='Отчество*'
                    errors={errors}
                />
                <FormInput 
                    name="email"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: `Это обязательное поле`, 
                        onBlur: ()=>trigger('email') 
                    }} 
                    label='Email*'
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
                    placeholder='Пароль*'
                    errors={errors}
                />
                <FormInput 
                    name="confirm_password*" 
                    type='password' 
                    register={register} 
                    rules={{ 
                        required: `Это обязательное поле`,
                        validate: (value) => {
                            const { password } = getValues();
                            return password === value || 'Пароли не совпадают';
                        },
                        minLength: {
                            value: 8,
                            message: "Слишком короткий пароль"
                        },
                        onBlur: ()=>trigger('confirm_password') 
                    }} 
                    placeholder='Повторите пароль'
                    errors={errors}
                />
                <Controller
                    name="birthDay"
                    control={control}
                    render={({field})=> {
                        return(
                            <FormDatePicker
                                onChange={(e:any)=>setValue("birthDay", e)}
                                value={field.value}
                            />
                        )
                    }}
                />
                
                <ButtonYellow type='submit'><Text20>{"Зарегистрироваться"}</Text20></ButtonYellow>
            </form>
        </>
    );
}

'use client'
import styles from './RegisterForm.module.css'
import { Controller, useForm } from 'react-hook-form';
import FormInput from '@/UI/Form/FormInput/FormInput';
import { ButtonYellow } from '@/UI/Buttons/ButtonYellow/ButtonYellow';
import { useTranslation } from 'react-i18next';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import { Text32 } from '@/UI/TextSizes/Text32/Text32';
import { FormDatePicker } from '@/UI/Form/FormDatePicker/FormDatePicker';
import moment from 'moment';
import { useAppDispatch } from '@/helpers/hooks/redux';
import { registerUser } from '@/Store/Slices/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import isAuthenticated from '@/helpers/utils/authProtection';

export interface IRegisterFormProps {
}

export function RegisterForm (props: IRegisterFormProps) {
    const { t } = useTranslation(['auth'])
    const {t: e} = useTranslation(['errors'])
    const dispatch = useAppDispatch()
    const router = useRouter();
    const { handleSubmit, register, getValues, setValue, trigger, formState: { errors }, control } = useForm();
    const onSubmit = (data: any) => {
        const reqData = {...data, birthDay: moment(data.birthDay).format('DD.MM.YYYY')}
        dispatch(registerUser({data: reqData, router}))
    }
    useEffect(()=> {
        if(isAuthenticated){
            router.push('/')
        }
    }, [router])
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Text32>
                    {t('register')}
                </Text32>
                <FormInput 
                    name="name"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: `${e('required')}`, 
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
                        required: `${e('required')}`, 
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
                        required: `${e('required')}`, 
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
                        required: `${e('required')}`,
                        minLength: {
                            value: 8,
                            message: e('short_password')
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
                        required: `${e('required')}`,
                        validate: (value) => {
                            const { password } = getValues();
                            return password === value || t('same_pass');
                        },
                        minLength: {
                            value: 8,
                            message: e('short_password')
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
                
                <ButtonYellow type='submit'><Text20>{t('register')}</Text20></ButtonYellow>
            </form>
        </>
    );
}

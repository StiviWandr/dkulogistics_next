'use client'
import styles from './AuthForm.module.css'
import { useForm } from 'react-hook-form';
import FormInput from '@/UI/Form/FormInput/FormInput';
import { ButtonYellow } from '@/UI/Buttons/ButtonYellow/ButtonYellow';
import { useTranslation } from 'react-i18next';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';
import { useAppDispatch } from '@/hooks/redux';
import { login } from '@/Store/Slices/clientSlices/userSlice';
import { useRouter } from 'next/navigation';


interface IAuthFormProps {

}

export function AuthForm (props: IAuthFormProps) {
    const { t } = useTranslation(['auth'])
    const {t: e} = useTranslation(['errors'])
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
                        required: `${e('required')}`, 
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
                        required: `${e('required')}`,
                        minLength: {
                            value: 8,
                            message: e('short_password')
                        },
                        onBlur: ()=>trigger('password') 
                    }} 
                    placeholder='Пароль'
                    errors={errors}
                />
                <ButtonYellow type='submit'><Text20>{t('login')}</Text20></ButtonYellow>
            </form>
        </>
    );
}
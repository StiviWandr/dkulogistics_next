import styles from './RegisterForm.module.css'
import { useForm } from 'react-hook-form';
import FormInput from '@/UI/Form/FormInput/FormInput';
import { ButtonYellow } from '@/UI/Buttons/ButtonYellow/ButtonYellow';
import { useTranslation } from 'react-i18next';
import { Text20 } from '@/UI/TextSizes/Text20/Text20';

export interface IRegisterFormProps {
}

export function RegisterForm (props: IRegisterFormProps) {
    const { t } = useTranslation(['auth'])
    const {t: e} = useTranslation(['errors'])
    const { handleSubmit, register, trigger, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {console.log(data);}
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                
                <FormInput 
                    name="name"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: `${e('required')}`, 
                        onBlur: ()=>trigger('name') 
                    }} 
                    label='Email'
                    errors={errors}
                />
                <FormInput 
                    name="vorname"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: `${e('required')}`, 
                        onBlur: ()=>trigger('vorname') 
                    }} 
                    label='Фамилия'
                    errors={errors}
                />
                <FormInput 
                    name="lastname"
                    type='text' 
                    register={register} 
                    rules={{ 
                        required: false, 
                    }} 
                    label='Отчество'
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
                <FormInput 
                    name="repeat_password" 
                    type='password' 
                    register={register} 
                    rules={{ 
                        required: `${e('required')}`,
                        minLength: {
                            value: 8,
                            message: e('short_password')
                        },
                        onBlur: ()=>trigger('repeat_password') 
                    }} 
                    placeholder='Повторите пароль'
                    errors={errors}
                />
                <ButtonYellow type='submit'><Text20>{t('register')}</Text20></ButtonYellow>
            </form>
        </>
    );
}

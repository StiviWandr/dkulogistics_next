// AuthorForm.tsx
"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Card, Checkbox } from 'antd';
import styles from './SecondStepForm.module.css'; // Предполагаем, что стили уже определены в этом файле
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { setCurrentSlide, setSendArticleData } from '../../redux/sendArticle';
import { useTranslations } from 'next-intl';

interface IAuthor {
    firstName: string;
    lastName: string;
    email: string;
    workPlace: string;
    fathersName: string;
    mainAuthor: boolean;
}

const defaultAuthor: IAuthor = {
    firstName: '',
    lastName: '',
    email: '',
    workPlace: '',
    fathersName: "",
    mainAuthor: false
};

const SecondStepForm: React.FC = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const t = useTranslations('Отправка статьи')
    const {articleData} = useAppSelector(state=>state.sendArticle)
    const { register, handleSubmit, reset, setValue, formState: { errors, isValid }, getValues, watch } = useForm<IAuthor>({defaultValues: defaultAuthor});
    const dispatch = useAppDispatch()
    const onSubmit = handleSubmit((data: IAuthor) => {
        let authorsCopy = [...authors]
        if (data.mainAuthor) {
            
            authorsCopy = authorsCopy.map(author => ({ ...author, mainAuthor: false }));
        }
        setAuthors(authorsCopy => [...authorsCopy, data]);
        reset(defaultAuthor);// Сброс формы после добавления автора
    });
    const watchedFields = watch();
    const handleRemoveAuthor = (index: number) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };
    const goNextStep = () => {
        dispatch(setCurrentSlide(2))
        dispatch(setSendArticleData({...articleData, authors: authors}))
    }
    return (
        <div className={styles.authorForm}>
            <form onSubmit={onSubmit}>
                <div className={styles.formItem}>
                    <label className={styles.formLabel}>{t('Имя')}</label>
                    <Input
                        value={watchedFields.firstName}
                        {...register('firstName', { required: t('Это поле обязательно к заполнению') })}
                        onChange={(e) => setValue('firstName', e.target.value)}
                        className={styles.formInput} />
                    {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
                </div>

                <div className={styles.formItem}>
                    <label className={styles.formLabel}>{t('Фамилия')}</label>
                    <Input
                        value={watchedFields.lastName}
                        {...register('lastName', { required: t('Это поле обязательно к заполнению') })}
                        onChange={(e) => setValue('lastName', e.target.value)}
                        className={styles.formInput} />
                    {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
                </div>
                
                <div className={styles.formItem}>
                    <label className={styles.formLabel}>{t('Отчество')}</label>
                    <Input
                        value={watchedFields.fathersName}
                        {...register('fathersName', { required: false })}
                        onChange={(e) => setValue('fathersName', e.target.value)}
                        className={styles.formInput} />
                    {errors.fathersName && <p className={styles.errorMessage}>{errors.fathersName.message}</p>}
                </div>

                <div className={styles.formItem}>
                    <label className={styles.formLabel}>E-Mail</label>
                    <Input
                        type='email'
                        value={watchedFields.email}
                        {...register('email', { required: t('Это поле обязательно к заполнению') })}
                        onChange={(e) => setValue('email', e.target.value)}
                        className={styles.formInput} />
                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                </div>

                <div className={styles.formItem}>
                    <label className={styles.formLabel}>{t('Место работы')}</label>
                    <Input
                        value={watchedFields.workPlace}
                        {...register('workPlace', { required: 'Это поле обязательно к заполнению' })}
                        onChange={(e) => setValue('workPlace', e.target.value)}
                        className={styles.formInput} />
                    {errors.workPlace && <p className={styles.errorMessage}>{errors.workPlace.message}</p>}
                </div>

                <div className={styles.formItem}>
                    
                    <Checkbox
                        {...register('mainAuthor')}
                        checked={getValues().mainAuthor}
                        onChange={(e) => setValue('mainAuthor', e.target.checked)}
                        className={styles.formCheckbox}>
                        {t('Этот автор является главным')}
                    </Checkbox>
                </div>
                <Button type="primary" htmlType="submit" className={styles.submitButton}>{t('Сохранить автора')}</Button>

                
            </form>

            <div className={styles.nav_button}>
                <Button type='dashed' onClick={()=>dispatch(setCurrentSlide(0))} htmlType="submit">
                    Назад
                </Button>
                <Button type="primary" onClick={goNextStep} disabled={authors.length===0} htmlType="submit">
                    Далее
                </Button>
            </div>
            <div className={styles.authorList}>
                {authors.map((author, index) => (
                    <Card
                        key={index}
                        title={`Автор ${index + 1}`}
                        extra={<Button type="text" icon={<CloseOutlined />} onClick={() => handleRemoveAuthor(index)} />}
                        className={styles.authorCard}
                    >
                        <p>Имя: {author.firstName}</p>
                        <p>Фамилия: {author.lastName}</p>
                        <p>Отчество: {author.fathersName}</p>
                        <p>E-Mail: {author.email}</p>
                        <p>Организация: {author.workPlace}</p>
                        <p>Главный автор: {author.mainAuthor ? 'Да' : 'Нет'}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SecondStepForm;

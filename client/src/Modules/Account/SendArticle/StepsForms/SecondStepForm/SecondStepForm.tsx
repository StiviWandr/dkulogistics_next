// AuthorForm.tsx
"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Card } from 'antd';
import styles from './SecondStepForm.module.css'; // Предполагаем, что стили уже определены в этом файле
import { CloseOutlined } from '@ant-design/icons';

interface IAuthor {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
}

const defaultAuthor: IAuthor = {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
};

const SecondStepForm: React.FC = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const { register, handleSubmit, reset, getValues, setValue, formState: { errors }, watch } = useForm<IAuthor>({defaultValues: defaultAuthor});

    const onSubmit = handleSubmit((data: IAuthor) => {
        setAuthors(authors => [...authors, data]);
        reset(defaultAuthor);// Сброс формы после добавления автора
    });
    const watchedFields = watch();
    const handleRemoveAuthor = (index: number) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };
    return (
        <div className={styles.authorForm}>
            <form onSubmit={onSubmit}>
                <div className={styles.formItem}>
                    <label className={styles.formLabel}>Имя</label>
                    <Input
                        value={watchedFields.firstName}
                        {...register('firstName', { required: 'Это поле обязательно к заполнению' })}
                        onChange={(e) => setValue('firstName', e.target.value)}
                        className={styles.formInput} />
                    {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
                </div>

                <div className={styles.formItem}>
                    <label className={styles.formLabel}>Фамилия</label>
                    <Input
                        value={watchedFields.lastName}
                        {...register('lastName', { required: 'Это поле обязательно к заполнению' })}
                        onChange={(e) => setValue('lastName', e.target.value)}
                        className={styles.formInput} />
                    {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
                </div>

                <div className={styles.formItem}>
                    <label className={styles.formLabel}>E-Mail</label>
                    <Input
                        value={watchedFields.email}
                        {...register('email', { required: 'Это поле обязательно к заполнению' })}
                        onChange={(e) => setValue('email', e.target.value)}
                        className={styles.formInput} />
                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                </div>

                <div className={styles.formItem}>
                    <label className={styles.formLabel}>Организация</label>
                    <Input
                        value={watchedFields.organization}
                        {...register('organization', { required: 'Это поле обязательно к заполнению' })}
                        onChange={(e) => setValue('organization', e.target.value)}
                        className={styles.formInput} />
                    {errors.organization && <p className={styles.errorMessage}>{errors.organization.message}</p>}
                </div>

                <Button type="primary" htmlType="submit" className={styles.submitButton}>Сохранить автора</Button>
            </form>

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
                  <p>E-Mail: {author.email}</p>
                  <p>Организация: {author.organization}</p>
                </Card>
            ))}
            </div>
        </div>
    );
};

export default SecondStepForm;

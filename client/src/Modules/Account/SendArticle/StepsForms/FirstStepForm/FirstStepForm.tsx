"use client"
import styles from './FirstStepForm.module.css'
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Select, Button, Checkbox } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { setCurrentSlide, setSendArticleData } from '../../redux/sendArticle';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { useTranslations } from 'next-intl';

const { Option } = Select;

const FirstStepForm = () => {
    const { register, handleSubmit, control, formState: { errors, isValid }, setValue, trigger } = useForm();
    const dispatch = useAppDispatch()
    const t = useTranslations('Отправка статьи')
    const {articleData} = useAppSelector(state=>state.sendArticle)
    const onInputChange = (name: string, value: string) => {
        setValue(name, value);
        trigger(name);
    };

    const onSubmit = (data: any) => {
        console.log(data);
        dispatch(setSendArticleData({...articleData, name: data.title, annotation: data.annotation, keywords: data.keywords}))
        dispatch(setCurrentSlide(1))
    };
    
    return (
        <div className={styles.submission_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_item}>
                <label htmlFor="articleTitle" className={styles.form_item_label}>{t('Название статьи')}</label>
                <Input id="articleTitle" {...register('title', { required: true, onChange: (e) => onInputChange('title', e.target.value) })} className={styles.form_item_input} />
                {errors.title && <p className={styles.error_message}>{t('Это поле обязательно к заполнению')}</p>}
            </div>
            <div className={styles.form_item}>
                <label htmlFor="articleAbstract" className={styles.form_item_label}>{t('Аннотация')}</label>
                <TextArea 
                    id="articleAbstract" 
                    {...register('annotation', { required: true,
                        onChange: (e) => onInputChange('annotation', e.target.value)
                    })} 
                    className={styles.form_item_input} 

                />
                {errors.abstract && <p className={styles.error_message}>{t('Это поле обязательно к заполнению')}</p>}
            </div>
            
            <div className={styles.form_item}>
                <label className={styles.form_item_label}>{t('Ключевые слова')}</label>
                <Controller
                    name="keywords"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder={t("Введите ключевые слова")}
                            listHeight={0}
                            onChange={(value) => {
                                console.log(value);
                                
                                field.onChange(value);
                            }}
                        />
                            
                        
                    )}
                />
            </div>
            <div className={styles.form_item}>
                <Controller
                    name="readRequirements"
                    control={control}
                    rules={{required: true}}
                    render={({ field }) => (
                    <Checkbox {...field} className={styles.form_item_checkbox}>
                        Я прочел Требования к оформлению статей
                    </Checkbox>
                    )}
                />
            </div>
            <div className={styles.form_item}>
            <Controller
                name="readVolumeInstructions"
                control={control}
                rules={{required: true}}
                render={({ field }) => (
                <Checkbox {...field} className={styles.form_item_checkbox}>
                    Я прочел Указания по объему и структуре статьи
                </Checkbox>
                )}
            />
            </div>
            <div className={styles.form_item}>
            <Controller
                name="readReviewProcess"
                control={control}
                rules={{required: true}}
                render={({ field }) => (
                <Checkbox {...field} className={styles.form_item_checkbox}>
                    Я прочел Информацию о процессе рецензирования
                </Checkbox>
                )}
            />
            </div>
            <div className={styles.form_button}>
                <Button type="primary" disabled={!isValid} htmlType="submit">
                    {t('Далее')}
                </Button>
            </div>
        </form>
        </div>
    );
};

export default FirstStepForm;

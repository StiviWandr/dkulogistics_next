'use client'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Button, Checkbox, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './ThirdStepForm.module.css';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { setSendArticleData, sendArticleFetch } from '../../redux/sendArticle';
import { useTranslations } from 'next-intl';

type FormData = {
  personalDataAgreement: boolean;
  originalWorkAgreement: boolean;
};
interface Author {
    name: string;
    affiliation: string;
}

interface FormDataObject {
    name: string;
    authors: Author[];
    annotation: string;
    keywords: string[];
    files: File[];
    isPaid: boolean;
}
const ThirdStepForm: React.FC = () => {
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<FormData>();
    const {articleData} = useAppSelector(state=>state.sendArticle)
    const dispatch = useAppDispatch()
    const t = useTranslations('Отправка статьи')
    const [files, setFiles] = useState<any[]>([])
    const onSubmit = (data: FormData) => {
        const formData = createFormData()
        dispatch(sendArticleFetch(formData))
    };
    const createFormData = () => {
        console.log(articleData);
        
        const formData = new FormData();

        formData.append('name', articleData.name);
        formData.append('annotation', articleData.annotation);
        articleData.keywords.forEach((keyword, index) =>
            formData.append(`keywords[${index}]`, keyword)
        );
        articleData.authors.forEach((author: any, index: number) => {
            Object.entries(author).forEach(([key, value]) => {
                if (typeof value === 'string' || value instanceof Blob) {
                    formData.append(`authors[${index}].${key}`, value);
                } else {
                    formData.append(`authors[${index}].${key}`, String(value));
                }
            });
        });
        
        files.forEach((file: File) => {
            formData.append('files', file, file.name);
        });
        
        
        formData.append('isPaid', articleData.isPaid.toString());
        return formData;
    }
    
    // Синхронизация состояния чекбоксов с useForm
    watch('personalDataAgreement');
    watch('originalWorkAgreement');

    return (
        <div className={styles.ThirdStepForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload.Dragger
                    name="files"
                    multiple
                    beforeUpload={() => false} // Вернуть false, чтобы предотвратить автоматическую загрузку
                    onChange={info => {
                        setFiles(info.fileList.map(file => file.originFileObj));
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">{t('Нажмите или перетащите файл в эту область')}</p>
                    <p className="ant-upload-hint">{t('Поддержка одновременной загрузки нескольких файлов')}</p>
                </Upload.Dragger>

                <div className={styles.agreements}>
                    <Checkbox {...register('personalDataAgreement')} onChange={e => setValue('personalDataAgreement', e.target.checked)}>
                        {t('Я принимаю согласие на обработку персональных данных')}
                    </Checkbox>
                    {errors.personalDataAgreement && <p className={styles.errorMessage}>Необходимо ваше согласие</p>}

                    <Checkbox {...register('originalWorkAgreement')} onChange={e => setValue('originalWorkAgreement', e.target.checked)}>
                        {t('Я подтверждаю, что моя статья является оригинальной работой и не нарушает чужие авторские права')}
                    </Checkbox>
                    {errors.originalWorkAgreement && <p className={styles.errorMessage}>Необходимо подтверждение</p>}
                </div>

                <Button type="primary" disabled={files?.length < 1 || !getValues().originalWorkAgreement || !getValues().personalDataAgreement} htmlType="submit" className={styles.submitButton}>
                    {t('Отправить статью')}
                </Button>
            </form>
        </div>
  );
};

export default ThirdStepForm;

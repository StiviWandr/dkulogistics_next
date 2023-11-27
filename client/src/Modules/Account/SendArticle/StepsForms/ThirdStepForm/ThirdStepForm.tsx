'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Button, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './ThirdStepForm.module.css';

type FormData = {
  personalDataAgreement: boolean;
  originalWorkAgreement: boolean;
};

const ThirdStepForm: React.FC = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();
    const onSubmit = (data: FormData) => {
        // Обрабатывайте отправку формы здесь
        console.log(data);
    };

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
                        // Обработка выбранных файлов
                        console.log(info.fileList);
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Нажмите или перетащите файл в эту область</p>
                    <p className="ant-upload-hint">Поддержка одновременной загрузки нескольких файлов</p>
                </Upload.Dragger>

                <div className={styles.agreements}>
                    <Checkbox {...register('personalDataAgreement')} onChange={e => setValue('personalDataAgreement', e.target.checked)}>
                        Я принимаю согласие на обработку персональных данных
                    </Checkbox>
                    {errors.personalDataAgreement && <p className={styles.errorMessage}>Необходимо ваше согласие</p>}

                    <Checkbox {...register('originalWorkAgreement')} onChange={e => setValue('originalWorkAgreement', e.target.checked)}>
                        Я подтверждаю, что моя статья является оригинальной работой и не нарушает чужие авторские права
                    </Checkbox>
                    {errors.originalWorkAgreement && <p className={styles.errorMessage}>Необходимо подтверждение</p>}
                </div>

                <Button type="primary" htmlType="submit" className={styles.submitButton}>
                    Продолжить
                </Button>
            </form>
        </div>
  );
};

export default ThirdStepForm;

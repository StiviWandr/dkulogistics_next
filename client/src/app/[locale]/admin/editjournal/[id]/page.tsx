'use client'
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Select, InputNumber, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import api from '@/api/api';
import { useParams } from 'next/navigation';
import moment from 'moment';
import { createFetchingNotify } from '@/helpers/functions/Toasts/toastsNotifications';

const { Option } = Select;

interface IJournalFormInput {
    year: number;
    period: number;
    file: FileList;
}

export default function EditJournalPage () {
    const {id} = useParams()
    const journalId = id;
    const currentYear = moment().year();
    const [form] = Form.useForm();
    const { control, handleSubmit, watch, getValues, formState: { errors }, setValue} = useForm<IJournalFormInput>({
        defaultValues: {
            year: currentYear,
            period: 1
        }
    });
    const file = watch("file");
    const [files, setFiles] = useState<any[]>([])
    useEffect(() => {
        // Загрузить данные журнала и установить в форме
        const fetchJournalData = async () => {
            try {
                const response = await api.get(`/journals/${journalId}`);
                form.setFieldsValue({
                    year: response.data.year,
                    period: response.data.period
                });
                // Здесь также можно установить файл, если он уже есть у журнала
            } catch (error) {
                // Обработка ошибок загрузки
            }
        };
        fetchJournalData();
    }, [journalId, form]);
    const deleteFileFetch = async (data: IJournalFormInput) =>{
        const formData = new FormData();
        formData.append('year', String(data.year));
        formData.append('period', String(data.period));
        formData.append('file', files[0]);
        try {
            const promise = api.put(`/journals/${journalId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await promise;
            createFetchingNotify(promise)
        } catch (error) {
            
        }
    }
    const onSubmit = async (data: IJournalFormInput) => {
        const formData = new FormData();
        formData.append('year', String(data.year));
        formData.append('period', String(data.period));
        if (files && files.length > 0) {
            formData.append('file', files[0]);
        }

        try {
            const promise = api.put(`/journals/${journalId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await promise;
            createFetchingNotify(promise)
        } catch (error) {
            
        }
    };
    const years = Array.from({ length: 3 }, (_, i) => currentYear + i);
    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit(onSubmit)} style={{padding: 40}}>
            <Form.Item
                label="Год"
                validateStatus={errors.year ? 'error' : ''}
                help={errors.year?.message}
            >
                <Controller
                    name="year"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select {...field} defaultValue={currentYear}>
                            {years.map(year => (
                                <Option key={year} value={year}>{year}</Option>
                            ))}
                        </Select>
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Квартал"
                validateStatus={errors.period ? 'error' : ''}
                help={errors.period?.message}
            >
                <Controller
                    name="period"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <InputNumber {...field} min={1} max={4} />
                    )}
                />
            </Form.Item>

            <Form.Item label="Добавить файл">
                <Controller
                    name="file"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Upload
                            beforeUpload={() => false}
                            onChange={(info: any) => {
                                setValue('file', info.fileList);
                                setFiles(info.fileList.map((file: any) => file.originFileObj))
                                return false;
                            }}
                            
                        >
                            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
                        </Upload>
                    )}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={()=>deleteFileFetch(getValues())}>
                    Удалить файл журнала
                </Button>
            </Form.Item>                
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};


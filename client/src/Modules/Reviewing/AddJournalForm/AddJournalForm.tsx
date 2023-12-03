import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Select, InputNumber } from 'antd';
import moment from 'moment';
import axios from 'axios';
import api from '@/api/api';
import { closeLoadingNotify, createErrorNotify, createFetchingNotify, createLoadingNotify } from '@/helpers/functions/Toasts/toastsNotifications';
import { useAppDispatch } from '@/helpers/hooks/redux';
import { getJournals } from '@/Modules/JournalsList/redux/journalsSlice';

const { Option } = Select;
const currentYear = moment().year();

interface IJournalFormInput {
    year: number;
    period: number;
}

const AddJournalForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const { control, handleSubmit, formState: { errors } } = useForm<IJournalFormInput>({
        defaultValues: {
            year: currentYear,
            period: 1
        }
    });

    const onSubmit = async (data: IJournalFormInput) => {
        
        try {

            const promise =  api.post('/journals/create', data);
            await promise;
            createFetchingNotify(promise, {success: "Журнал добавлен"})
            dispatch(getJournals())
        } catch (error: any) {
            
            createErrorNotify(error.response.data.message)
        }
    };

    // Generate a list of years for selection
    const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

    return (
        <Form onFinish={handleSubmit(onSubmit)}>
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
                        <InputNumber {...field} min={1} max={4} defaultValue={1} />
                    )}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Добавить журнал</Button>
            </Form.Item>
        </Form>
    );
};

export default AddJournalForm;

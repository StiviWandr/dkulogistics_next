import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import moment, { Moment } from 'moment';
import { useAppSelector } from '@/helpers/hooks/redux';
import api from '@/api/api';
import { FormDatePicker } from '@/UI/Form/FormDatePicker/FormDatePicker';

interface IUserForm {
    email: string;
    password: string;
    name: string;
    lastName: string;
    fathersName: string;
}

const ProfileEditPage: React.FC = () => {
    const { info } = useAppSelector(state => state.user);
    const [form] = Form.useForm();

    useEffect(() => {
        if (info) {
            form.setFieldsValue({
                ...info
            });
        }
        
        
    }, [info, form]);
    const handleSubmit = async (values: IUserForm) => {
        const userId = info?.id;
        try {
            await api.put(`/user/${userId}`, {
                ...values
            });
            message.success('Профиль успешно обновлен!');
        } catch (error) {
            message.error('Ошибка при обновлении профиля!');
        }
    };

    return (
        <Form 
            layout="vertical" 
            form={form}
            onFinish={handleSubmit} 
            // initialValues={info} // Установка начальных значений формы
            style={{ padding: 40 }}
        >
            <Form.Item 
                label="Email" 
                name="email" 
                rules={[{ type: 'email', required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
                label="Имя" 
                name="name" 
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
                label="Фамилия" 
                name="lastName"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
                label="Отчество" 
                name="fathersName" 
                
            >
                <Input />
            </Form.Item>

            

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProfileEditPage;

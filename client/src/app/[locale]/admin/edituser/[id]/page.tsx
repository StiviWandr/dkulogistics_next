'use client'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import api from '@/api/api';
import { FormDatePicker } from '@/UI/Form/FormDatePicker/FormDatePicker';

interface IUserForm {
    email: string;
    name: string;
    lastName: string;
    fathersName: string;
    birthDay: moment.Moment | null;
}
const { Option } = Select;

const EditUserPage: React.FC = () => {
    
    const [formData, setFormData] = useState<IUserForm>({
        email: '',
        name: '',
        lastName: '',
        fathersName: '',
        birthDay: null,
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const {id} = useParams()
    const [form] = Form.useForm();

    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                const response = await api.get(`/user/${id}`);
                setFormData({
                    ...response.data,
                    birthDay: moment(response.data.birthDay)
                });
            } catch (error) {
                message.error('Ошибка при загрузке данных пользователя!');
            }
            setIsLoading(false);
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (values: IUserForm) => {
        try {
            await api.put(`/user/${id}`, {
                ...values,
                birthDay: values.birthDay?.toISOString(),
            });
            message.success('Данные пользователя успешно обновлены!');
        } catch (error) {
            message.error('Ошибка при обновлении данных пользователя!');
        }
    };

    if (isLoading) return <Spin />;

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ ...formData }}
            style={{ padding: 40 }}
        >
            <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Фамилия" name="lastName">
                <Input />
            </Form.Item>
            <Form.Item label="Отчество" name="fathersName">
                <Input />
            </Form.Item>
            <Form.Item label="Роль" name="role" rules={[{ required: true }]}>
                <Select placeholder="Выберите роль" value={form.getFieldValue('role')}>
                    <Option value="admin">Администратор</Option>
                    <Option value="user">Пользователь</Option>
                    <Option value="reviewer">Рецензент</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Дата рождения" name="birthDay">
                <FormDatePicker value={form.getFieldValue('birthDay')} onChange={(e: any)=>form.setFieldValue('birthDay', e)}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditUserPage;

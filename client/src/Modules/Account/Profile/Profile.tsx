import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import moment, { Moment } from 'moment';
import { useAppSelector } from '@/helpers/hooks/redux';
import { FormDatePicker } from '@/UI/Form/FormDatePicker/FormDatePicker';
import api from '@/api/api';

interface IUserForm {
    email: string;
    password: string;
    birthDay: Moment | null;
    name: string;
    lastName: string;
    fathersName: string;
}

const ProfileEditPage: React.FC = () => {
    const {info} = useAppSelector(state=>state.user)
    const [formData, setFormData] = useState<IUserForm>(info || {
        email: '',
        password: '',
        birthDay: moment(),
        name: '',
        lastName: '',
        fathersName: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date: Moment | null) => {
        setFormData({ ...formData, birthDay: date });
    };
    useEffect(()=>{
        info? setFormData(info): setFormData({
            email: '',
            password: '',
            birthDay: moment(),
            name: '',
            lastName: '',
            fathersName: '',
        })
        
    }, [info])
    const handleSubmit = async () => {
        const userId = info.id;
        try {
            const response = await api.put(`/user/${userId}`, {
                ...formData,
                birthDay: formData.birthDay?.format('YYYY-MM-DD'), // Форматируем дату в строку
            });
            message.success('Профиль успешно обновлен!');
        } catch (error) {
            message.error('Ошибка при обновлении профиля!');
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit} style={{padding: 40}}>
            <Form.Item valuePropName='email' label="Email" name="email" rules={[{ type: 'email', required: true }]}>
                <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item valuePropName='name' label="Имя" name="name" rules={[{ required: true }]}>
                <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item valuePropName='lastName' label="Фамилия" name="lastName">
                <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item valuePropName='fathersName' label="Отчество" name="fathersName" rules={[{ required: true }]}>
                <Input
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item valuePropName='birthDay' label="Дата рождения">
                <FormDatePicker
                    value={formData.birthDay?formData.birthDay: moment()}
                    onChange={(date: Moment) => handleDateChange(date!)}
                />
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

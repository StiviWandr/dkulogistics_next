'use client'
import React, { useState, useEffect } from 'react';
import { Card, Button, Spin,  } from 'antd';
import api from '@/api/api';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import { useAppSelector } from '@/helpers/hooks/redux';

interface IUser {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    fathersName: string;
    role: 'reviewer' | 'user' | 'admin'
}
const rolesDictionary = {
    reviewer: "Рецензент",
    user: "Пользователь",
    admin: "Админ"
}
const UsersListPage: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const {info} = useAppSelector(state=>state.user)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()    
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/users');
                setUsers(response.data.filter((user: any)=>user._id!==info.id));
            } catch (error) {
                console.error('Ошибка при получении списка пользователей:', error);
            }
            setIsLoading(false);
        };
        if(info) fetchUsers();
    }, [info]);

    const handleEdit = (userId: string) => {
        router.push(`/admin/edituser/${userId}`);
    };

    const handleDelete = async (userId: string) => {
        try {
            await api.delete(`/user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    if (isLoading) {
        return <Spin />;
    }

    return (
        <div style={{padding: 40}}>
            {users?.map(user => (
                <Card key={user._id} title={`${user.name} ${user.fathersName}`} style={{marginBottom: 30}}>
                    <p>Email: {user.email}</p>
                    <p>Роль: {rolesDictionary[user.role]}</p>
                    <div className={styles.buttons}>
                        <Button danger onClick={() => handleDelete(user._id)}>Удалить</Button>
                        <Button onClick={() => handleEdit(user._id)}>Редактировать</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default UsersListPage;

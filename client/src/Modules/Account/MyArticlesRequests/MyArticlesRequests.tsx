import React, { useEffect, useState } from 'react';
import { Table, Spin, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment'; // Убедитесь, что библиотека moment.js установлена в вашем проекте
import api from '@/api/api';
import { apiImageStorage } from '@/api/config';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { getMyArticlesRequests } from './redux/myArticlesRequestSlice';

interface Article {
    _id: string;
    status: 'pending' | 'onReview' | 'canceled' | 'passedReview' | 'published';
    createdAt: string;
    title: string;
    fileUrl: string; // Предполагается, что у вас есть URL файла
}

const statusesDictionary = {
    pending: "В очереди", 
    onReview: "На рецензии", 
    canceled: "Отменена", 
    passedReview: "Прошла рецензию", 
    published: "Опубликована"
}
const MyArticlesRequestsTable: React.FC = () => {
    const {myArticlesRequests} = useAppSelector(state=>state.myArticlesRequests)
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            dispatch(getMyArticlesRequests())
            setLoading(false);
        };

        fetchArticles();
    }, []);

    const columns = [
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status: Article['status']) => {
                let color = 'geekblue';
                if (status === 'published') color = 'green';
                else if (status === 'onReview') color = 'orange';
                else if (status === 'canceled') color = 'red';
                else if (status === 'passedReview') color = 'cyan';
                return <Tag color={color}>{statusesDictionary[status]}</Tag>;
            },
        },
        {
            title: 'Дата создания',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (createdAt: string) => moment(createdAt).format('DD.MM.YYYY HH:mm'),
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Файл',
            dataIndex: 'files',
            key: 'fileUrl',
            render: (files: any) => <a href={`${apiImageStorage}/${files[0].filename}`} download target="_blank" rel="noopener noreferrer">Скачать</a>,
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table
                columns={columns}
                dataSource={myArticlesRequests}
                rowKey={record => record._id}
            />
        </Spin>
    );
};

export default MyArticlesRequestsTable;

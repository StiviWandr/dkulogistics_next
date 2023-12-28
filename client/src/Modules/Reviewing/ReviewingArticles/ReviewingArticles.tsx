import React, { useEffect, useState } from 'react';
import { Table, Spin, Tag } from 'antd';
import moment from 'moment'; // Убедитесь, что библиотека moment.js установлена в вашем проекте
import { apiImageStorage } from '@/api/config';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { getReviewingArticles } from './redux/reviewingArticlesSlice';
import { useRouter } from 'next/navigation';
import { decodeString } from '@/helpers/functions/decodingNames/decodeName';

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
const ReviewingArticles: React.FC = () => {
    const {reviewingArticles} = useAppSelector(state=>state.reviewingArticles)
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            dispatch(getReviewingArticles())
            setLoading(false);
        };
        fetchArticles();
    }, [dispatch]);

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
            render: (files: any) => <a href={`${apiImageStorage}/${files[0].filename}`} download={decodeString(files[0].originalname)} target="_blank" rel="noopener noreferrer">Скачать</a>,
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            router.push("/reviewing/" + record._id)
                        }, 
                    };
                  }}
                columns={columns}
                dataSource={reviewingArticles}
                rowKey={record => record._id}
                style={{margin: "0 40px"}}
            />
        </Spin>
    );
};

export default ReviewingArticles;

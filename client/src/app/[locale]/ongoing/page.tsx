"use client"
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { List, Card, Button } from 'antd';
import { useRouter } from 'next/navigation';

interface IArticle {
    _id: string;
    name: string;
    annotation: string;
    journalId: string;
    created_at: Date;
}

interface ArticlesProps {
    articles: IArticle[];
}

export default function ArticlesPage ()  {
    const [articles, setArticles] = useState<IArticle[]>([])
    const router = useRouter()
    useEffect(()=>{
        const fetchArticles = async () => {
            const queryParams = `?status=published`;
            const response = await api.get('/articles')
            setArticles(response.data)
        }
        fetchArticles()
    }, [])
    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={articles}
            renderItem={item => (
                <List.Item
                    key={item._id}
                    
                >
                    <Card title={item.name}>
                        <p>{item.annotation}</p>
                        <p>Последнее редактирование {new Date(item.created_at).toLocaleDateString()}</p>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Button style={{padding: "5px 0"}} type="link" href={`/uploads/${item._id}.pdf`}>Скачать PDF</Button>
                            <Button style={{padding: "5px 0"}} type="link" onClick={() => router.push(`/articles/${item._id}`)}>Читать далее</Button>
                        </div>
                        
                    </Card>
                </List.Item>
            )}
        />
    );
};


"use client"
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { List, Card, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { apiImageStorage } from '@/api/config';
import { Container } from '@/UI/Container/Container';

interface IArticle {
    _id: string;
    name: string;
    annotation: string;
    journalId: string;
    created_at: Date;
    files: Array<any>
}

interface ArticlesProps {
    articles: IArticle[];
}

export default function ArticlesPage ()  {
    const [articles, setArticles] = useState<IArticle[]>([])
    const router = useRouter()
    useEffect(()=>{
        const fetchArticles = async () => {
            const response = await api.get('/ongoing-articles')
            setArticles(response.data)
        }
        fetchArticles()
    }, [])
    return (
        <Container>
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
                                <Button style={{padding: "5px 0"}} type="link" href={`${apiImageStorage}/${item.files[0]?.filename}`}>Скачать PDF</Button>
                                <Button style={{padding: "5px 0"}} type="link" onClick={() => router.push(`/articles/${item._id}`)}>Читать далее</Button>
                            </div>

                        </Card>
                    </List.Item>
                )}
            />
        </Container>
        
    );
};


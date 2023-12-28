"use client"
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { List, Card, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { apiImageStorage } from '@/api/config';
import { Container } from '@/UI/Container/Container';
import { decodeString } from '@/helpers/functions/decodingNames/decodeName';
import { Text24 } from '@/UI/TextSizes/Text24/Text24';

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

export default function JournalArticlesPage ({ params }: { params: { id: string } })  {
    const [articles, setArticles] = useState<IArticle[]>([])
    const [journalName, setJournalName] = useState<any>(null)
    const [journal, setJournal] = useState<any>(null)
    const router = useRouter()
    useEffect(()=>{
        const fetchArticles = async () => {
            const response = await api.get(`/journals/${params.id}/articles`)
            setArticles(response.data)
        }
        const fetchJournalData = async () => {
            const response = await api.get(`/journals/${params.id}`)
            setJournal(response.data)
            setJournalName(decodeString(response.data.file.originalname))
        }
        fetchArticles()
        fetchJournalData()
    }, [])
    return (
        <Container>
            <div style={{marginBottom: 20, marginTop: 20}}>
                <Text24>Журнал {journal?.year + " №"+ journal?.period}</Text24>
            </div>
            
            {journal && (
                <Card style={{ marginBottom: 20 }}>
                    <h2>{journal.name}</h2>
                    {journal.file && (
                        <Button 
                            type="link" 
                            href={`${apiImageStorage}/${journal.file.filename}`}
                            download={journalName}
                        >
                            Скачать Журнал "{journalName}"
                        </Button>
                    )}
                </Card>
            )}
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
                                <Button style={{padding: "5px 0"}} type="link" href={`${apiImageStorage}/${item.files[0]?.filename}`}>Скачать статью</Button>
                                <Button style={{padding: "5px 0"}} type="link" onClick={() => router.push(`/articles/${item._id}`)}>Читать далее</Button>
                            </div>

                        </Card>
                    </List.Item>
                )}
            />
        </Container>
        
    );
};


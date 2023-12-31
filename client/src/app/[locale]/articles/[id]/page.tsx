'use client'
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Typography } from 'antd';
import api from '@/api/api';
import { Container } from '@/UI/Container/Container';
import { DownloadOutlined } from '@ant-design/icons';
import { apiImageStorage } from '@/api/config';
import { decodeString } from '@/helpers/functions/decodingNames/decodeName';

const { Text } = Typography;

// Стили компонента
const styles = {
    container: {
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    metaData: {
        marginBottom: '20px',
    },
    section: {
        marginBottom: '20px',
    },
    tag: {
        marginRight: '5px',
    },
    groupTitle: {
        marginBottom: "10px",
        color:" #333",
        fontSize: "18px",
        fontWeight: "bold",
    }
};

interface IArticle {
    _id: string;
    name: string;
    annotation: string;
    journalId: string;
    created_at: Date;
    files: Array<any>,
    keywords: Array<string>,
    authors: Array<
    {
        fathersName: string,
        lastName?: string,
        firstName: string, 
        email: string,
        workPlace: string 
    }>
}


export default function ArticleDescription ({ params }: { params: { id: string } }) {
    const [article, setArticle] =useState<IArticle | null>(null)

    useEffect(()=>{
        const fetchArticle = async () => {
            const response = await api.get(`/articles/${params.id}`)
            setArticle(response.data)
        }
        fetchArticle()
    }, [params.id])
    return (
        <div style={{marginTop: 40}}>
            <Container>
                <h1 style={styles.title}>{article?.name}</h1>
                {/* <div style={styles.metaData}>
                    <p>{article?.conference}</p>
                    <p>Последнее редактирование {article?.lastEdited}</p>
                </div> */}
                <Card title="Аннотация" style={styles.section}>
                    <p>{article?.annotation}</p>
                </Card>
                <Card title="Об авторах" style={styles.section}>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={article?.authors}
                        renderItem={author => (
                            <List.Item>
                                <Card title={`${author.firstName} ${author.fathersName}`}>
                                    {author.lastName && <p>Фамилия: {author.lastName}</p>}
                                    <p>Email: {author.email}</p>
                                    <p>Место работы: {author.workPlace}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Card>
                        
                <Card title="Ключевые слова" style={styles.section}>
                    {article?.keywords?.map(keyword => (
                        <Tag color="blue" key={keyword} style={styles.tag}>
                            {keyword}
                        </Tag>
                    ))}
                </Card>
                <div>
                    <div style={styles.groupTitle}>Файлы</div>
                    <List
                        bordered
                        dataSource={article?.files}
                        renderItem={file => {
                            console.log(file);
                            
                            return(
                                <List.Item>
                                    <Text copyable={{ text: `${apiImageStorage}/${file.filename}` }}>
                                        {decodeString(file.originalname)}
                                    </Text>
                                    <a href={`${apiImageStorage}/${file.filename}`} download>
                                        <DownloadOutlined style={{fontSize: 20}}/>
                                    </a>
                                    
                                </List.Item>
                            )
                        }}
                    />
                </div>
            </Container>
        </div>
        
    );
};


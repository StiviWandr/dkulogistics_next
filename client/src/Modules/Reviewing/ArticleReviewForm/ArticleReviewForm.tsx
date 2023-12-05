'use client'
import React, { useEffect, useState } from 'react';

import { Select, Button, Spin, List, Typography, Card } from 'antd';
import api from '@/api/api';

import styles from "./ArticleReviewForm.module.css"
import { apiImageStorage } from '@/api/config';
import { DownloadOutlined } from '@ant-design/icons';
import { createFetchingNotify } from '@/helpers/functions/Toasts/toastsNotifications';
import ButtonGroup from 'antd/es/button/button-group';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
const { Option } = Select;
const { Text } = Typography;

// Интерфейс для журнала
interface IJournal {
    _id: string;
    year: number;
    period: number;
    image: string;
}

// Интерфейс для автора в статье
interface IAuthor {
    fathersName: string;
    lastName: string;
    firstName: string;
    email: string;
    workPlace: string;
}

// Интерфейс для статьи
interface IArticle {
    _id: string;
    journalId: string;
    name: string;
    authors: IAuthor[];
    annotation: string;
    sender: string; // или IUser, если у вас есть интерфейс пользователя
    keywords?: string[];
    status: 'pending' | 'onReview' | 'canceled' | 'passedReview' | 'published';
    created_at: Date | string;
    files: any[];
    downloadCount: number;
    liked: number;
    isPaid: boolean;
}

const ArticleReviewForm = ({articleId}: {articleId: string}) => {
    
    const router = useRouter()
    const [article, setArticle] = useState<IArticle | null>(null);
    const [journals, setJournals] = useState([]);
    const [selectedJournalId, setSelectedJournalId] = useState('');
    const [loading, setLoading] = useState(true);
    const [reviewComment, setReviewComment] = useState("");
    const [status, setStatus] = useState<'pending' | 'onReview' | 'canceled' | 'passedReview' | 'published'>('pending');

    const fetchArticleAndJournals = async () => {
        setLoading(true);
        try {
            const articleResponse = await api.get(`/articles/${articleId}`);
            setArticle(articleResponse.data);
            setStatus(articleResponse.data.status);
            setSelectedJournalId(articleResponse.data.journalId);
            const journalsResponse = await api.get('/journals');
            setJournals(journalsResponse.data);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchArticleAndJournals();
    }, [articleId]);

    const updateArticle = async () => {
        try {
            const promise = api.put(`/articles/${articleId}`, { ...article, status: status, journalId: selectedJournalId });
            await promise;
            setArticle(article?{ ...article, status: status, journalId: selectedJournalId }: null)
            createFetchingNotify(promise, {success: "Информация о статье изменена"})
        } catch (error) {
            console.error('Ошибка при обновлении статьи:', error);
        }
    };
    const submitReview = async () => {
        const promise = api.post(`/review`, { article: articleId, comment: reviewComment });
        await promise;
        createFetchingNotify(promise, {success: "Рецензия отправлена"})
        router.push("/reviewing")
    }
    return (
        <Spin spinning={loading}>
            {article && (
                <div className={styles.form}>
                    <div className={styles.group}>
                        <div className={styles.groupTitle}>Название статьи</div>
                        <div className={styles.groupContent}>{article.name}</div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.groupTitle}>Аннотация</div>
                        <div className={styles.groupContent}>{article.annotation}</div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.groupTitle}>Авторы</div>
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
                    </div>
                    
                    <div className={`${styles.group}`}>
                        <div className={styles.groupTitle}>Статус:</div>
                        <Select
                            value={status}
                            onChange={setStatus}
                            style={{width: '100%'}}
                        >
                            <Option value="pending">В очереди</Option>
                            <Option value="onReview">На рецензии</Option>
                            <Option value="canceled">Отменено</Option>
                            <Option value="passedReview">Прошла рецензию</Option>
                            <Option value="published">Опубликована</Option>
                        </Select>
                    </div>
                    {
                        status === "passedReview" &&
                        <div className={`${styles.group}`}>
                            <div className={styles.groupTitle}>В какой журнал опубликовать:</div>
                            <Select
                                value={selectedJournalId}
                                onChange={setSelectedJournalId}
                                style={{ width: 200 }}
                            >
                                {journals.map((journal: IJournal) => (
                                    <Option key={journal?._id} value={journal?._id}>
                                        {journal?.year} №{journal?.period}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    }
                    
                    
                    <div className={styles.group}>
                        <div className={styles.groupTitle}>Файлы</div>
                        <List
                            bordered
                            dataSource={article.files}
                            renderItem={file => {
                                console.log(file);
                                
                                return(
                                    <List.Item>
                                        <Text copyable={{ text: `${apiImageStorage}/${file.filename}` }}>
                                            {file.originalname}
                                        </Text>
                                        <a href={`${apiImageStorage}/${file.filename}`} download>
                                            <DownloadOutlined style={{fontSize: 20}}/>
                                        </a>
                                        
                                    </List.Item>
                                )
                            }}
                        />
                    </div>
                    <ButtonGroup>
                        <Button onClick={updateArticle} type='primary'>Сохранить изменения</Button>
                    </ButtonGroup>
                    {
                        (article.status==="canceled" || article.status==="passedReview" )
                        &&
                        
                        <div className={styles.group}>
                            <div className={styles.groupTitle}>Добавить комментарий к рецензии</div>
                            <TextArea 

                                value={reviewComment}
                                // className={styles.form_item_input} 
                                onChange={e => {setReviewComment(e.target.value)}}
                            />
                            <ButtonGroup>
                                <Button onClick={submitReview} type='primary'>Отправить рецензию</Button>
                            </ButtonGroup>
                        </div>
                    }
                    
                </div>
            )}
            
        </Spin>
    );
};

export default ArticleReviewForm;

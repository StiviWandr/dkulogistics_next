'use client'
import React, { useState, useEffect } from 'react';
import { List, Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { deleteJournal, getJournals } from './redux/journalsSlice';
import styles from "./JournalsLIst.module.css"
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import JournalImage from "../../assets/images/journal.png"
interface Journal {
    _id: string;
    year: number;
    period: number;
    image: string; // Путь к изображению
}

interface Props {
    adminPanel?: boolean
}
const JournalsList = (props: Props) => {
    const {journals} = useAppSelector(state=>state.journals)
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(() => {
        dispatch(getJournals())
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        dispatch(deleteJournal(id))
    };

    return (
        <List
            grid={{
                gutter: 16,
                column: 4
            }}
            dataSource={journals}
            renderItem={(journal: Journal) => (
                <>
                    <List.Item key={journal?._id}>
                        {
                            <Card
                                key={'card'+journal._id}
                                cover={<Image width={150}  layout='responsive' className={styles.JournalImage} alt="journal" src={JournalImage} />}
                                actions={props.adminPanel?
                                    [
                                        <Button 
                                            icon={<DeleteOutlined />} 
                                            onClick={() => handleDelete(journal?._id)}
                                        >
                                            Удалить
                                        </Button>,
                                        <Button  
                                            onClick={() => router.push('/admin/editjournal/'+journal?._id)}
                                        >
                                            Редактировать
                                        </Button>
                                    ] : []}
                            >
                                <Link href={`/journals/${journal?._id}`}>Журнал {journal.year}  Выпуск {journal.period} </Link>
                            </Card>
                            
                        }
                    </List.Item>
                </>
                
            )}
        />
    );
};

export default JournalsList;

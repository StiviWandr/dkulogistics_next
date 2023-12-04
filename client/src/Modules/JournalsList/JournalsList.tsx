'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { deleteJournal, getJournals } from './redux/journalsSlice';
import { apiImageStorage, apiUrl } from '@/api/config';
import Link from 'next/link';

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
    useEffect(() => {
        dispatch(getJournals())
    }, []);

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
            renderItem={journal => (
                <List.Item>
                    {
                        

                        <Card
                            cover={<img alt="journal" src={`${apiImageStorage}/${journal.image}`} />}
                            actions={props.adminPanel?[
                                <Button 
                                    icon={<DeleteOutlined />} 
                                    onClick={() => handleDelete(journal?._id)}
                                >
                                    Delete
                                </Button>
                            ] : []}
                        >
                            <Link href={`/journals/${journal?._id}`}>Журнал {journal.year}  Выпуск {journal.period} </Link>
                        </Card>
                        
                    }
                </List.Item>
            )}
        />
    );
};

export default JournalsList;

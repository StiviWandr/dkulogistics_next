'use client'
import { Menu } from 'antd';
import styles from './InfoSidebar.module.css'
import { FileOutlined, FileProtectOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { apiImageStorage } from '@/api/config';

interface IInfoSidebarProps {

}

export function InfoSidebar (props: IInfoSidebarProps) {
    return (
        <div className={styles.sidebar}>
           <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1" icon={<FileOutlined />}>
                    <Link href={'/account/send'}>
                        Отправить статью
                    </Link>
                    
                </Menu.Item>
                <Menu.Item key="3" icon={<FileProtectOutlined />}>
                    <Link href={'/publishingrules'}>
                        Правила оформления статей
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FileProtectOutlined />}>
                    <Link href={'/authorsrules'}>
                        Информация для авторов
                    </Link>
                </Menu.Item>
                
                <Menu.Item key="4" icon={<FileProtectOutlined />}>
                    <Link href={'/readersrules'}>
                        Информация для читателей
                    </Link>
                </Menu.Item>
            </Menu> 
            <a style={{padding: '0 40px', display: 'block'}} href={`${apiImageStorage}/license.pdf`} download={true}>
                Свидетельство о постановке на учет в КИ
            </a>
        </div>
    );
}
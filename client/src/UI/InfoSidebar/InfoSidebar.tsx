'use client'
import { Menu } from 'antd';
import styles from './InfoSidebar.module.css'
import { FileOutlined, FileProtectOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface IInfoSidebarProps {

}

export function InfoSidebar (props: IInfoSidebarProps) {
    return (
        <div>
           <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1" icon={<FileOutlined />}>
                    <Link href={'/account/send'}>
                        Отправить статью
                    </Link>
                    
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                    <Link href={'/editorialteam'}>
                        Редакционная коллегия
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
        </div>
    );
}
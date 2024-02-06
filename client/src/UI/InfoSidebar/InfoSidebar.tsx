'use client'
import { Menu } from 'antd';
import styles from './InfoSidebar.module.css'
import { FileOutlined, FileProtectOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { apiImageStorage } from '@/api/config';
import { useTranslations } from 'next-intl';

interface IInfoSidebarProps {

}

export function InfoSidebar (props: IInfoSidebarProps) {
    const t = useTranslations('Сайдбар')
    return (
        <div className={styles.sidebar}>
           <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1" icon={<FileOutlined />}>
                    <Link href={'/account/send'}>
                        {t('Отправить статью')}
                    </Link>
                    
                </Menu.Item>
                <Menu.Item key="3" icon={<FileProtectOutlined />}>
                    <Link href={'/publishingrules'}>
                        {t('Правила оформления статей')}
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FileProtectOutlined />}>
                    <Link href={'/authorsrules'}>
                        {t('Информация для авторов')}
                    </Link>
                </Menu.Item>
                
                <Menu.Item key="4" icon={<FileProtectOutlined />}>
                    <Link href={'/readersrules'}>
                        {t('Информация для читателей')}
                    </Link>
                </Menu.Item>
            </Menu> 
            <a style={{padding: '0 40px', display: 'block'}} href={`${apiImageStorage}/license.pdf`} download={true}>
                {t('Свидетельство о постановке на учет в КИ')}
            </a>
        </div>
    );
}
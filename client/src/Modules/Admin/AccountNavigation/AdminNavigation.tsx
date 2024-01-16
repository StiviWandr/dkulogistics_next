"use client"
import styles from './AdminNavigation.module.css'
import Link from 'next/link';
import { Text16 } from '@/UI/TextSizes/Text16/Text16';
import { usePathname } from 'next/navigation';
interface IAccountNavigationProps {
    locale: string
}

export function AdminNavigation (props: IAccountNavigationProps) {
    const path = usePathname()
    
    
    const localeLink = props.locale==='ru' ? '/': `/${props.locale}`
    console.log(localeLink);
    const links = [
        {to: "admin", name: "Пользователи"},
        {to: "admin/addjournal", name: "Добавление журнала"},
        
    ]
    return (
        <>
            <div className={styles.nav}>
                {
                    links.map(link => {
                        return(
                            <Link className={`${styles.link} ${path===`${localeLink}${link.to}` ? styles.link__active : ''}`} 
                                key={link.name} 
                                href={`/${props.locale}/${link.to}`}
                            >
                                <Text16>
                                    {link.name}
                                </Text16>
                            </Link>
                        )
                    })
            }
            </div>
        </>
    );
}
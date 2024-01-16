'use client'
import Link from 'next/link';
import styles from './Navigation.module.css'
import { Text16 } from '../../TextSizes/Text16/Text16';
import { usePathname } from 'next/navigation';


interface INavigationProps {
    locale: string
}

export function Navigation (props: INavigationProps) {
    const path = usePathname()
    const localeLink = props.locale==='ru' ? '': `${props.locale}`
    
    const links = [
        {to: "", name: 'Главная'},
        {to: "about", name: 'О журнале'},
        {to: "ongoing", name: 'Текущий выпуск'},
        {to: "journals", name: 'Архивы'},
        {to: "contacts", name: 'Контакты'},
    ]
    return (
        <div className={styles.navigation}>
            {
                links.map(link => {
                    return(
                        <Link className={`${styles.link} ${path===`${localeLink}${link.to}` ? styles.link__active : ''}`} 
                            key={link.name} 
                            href={localeLink+'/'+link.to}>
                            <Text16>
                                {link.name}
                            </Text16>
                        </Link>
                    )
                })
            }
        </div>
    );
}
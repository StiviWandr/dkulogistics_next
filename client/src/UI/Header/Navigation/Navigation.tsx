'use client'
import Link from 'next/link';
import styles from './Navigation.module.css'
import { Text16 } from '../../TextSizes/Text16/Text16';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';


interface INavigationProps {
    locale: string
}

export function Navigation (props: INavigationProps) {
    const path = usePathname()
    const t = useTranslations('Header')
    
    const localeLink = props.locale==='ru' ? '/': `/${props.locale}`
    
    const links = [
        {to: "", name: t('Главная')},
        {to: "about", name: t('О журнале')},
        {to: "ongoing", name: t('Текущий выпуск')},
        {to: "journals", name: t('Архивы')},
        {to: "editorialteam", name: t('Ред коллегия')},
        {to: "contacts", name: t('Контакты')},
        
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
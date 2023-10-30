'use client'
import Link from 'next/link';
import styles from './Navigation.module.css'
import { Text16 } from '../../TextSizes/Text16/Text16';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
interface INavigationProps {
    locale: string
}

export function Navigation (props: INavigationProps) {
    const path = usePathname()
    const {t} = useTranslation(['header'])
    const localeLink = props.locale==='ru' ? '/': `/${props.locale}`
    
    const links = [
        {to: "", name: t('home')},
        {to: "about", name: t('about')},
        {to: "ongoing", name: t('ongoing')},
        {to: "archive", name: t('archives')},
        {to: "contacts", name: t('contacts')},
    ]
    return (
        <nav className={styles.navigation}>
            {
                links.map(link => {
                    return(
                        <Link className={`${styles.link} ${path===`${localeLink}${link.to}` ? styles.link__active : ''}`} 
                            key={link.name} 
                            href={`/${props.locale}/${link.to}`}>
                            <Text16>
                                {link.name}
                            </Text16>
                        </Link>
                    )
                })
            }
        </nav>
    );
}
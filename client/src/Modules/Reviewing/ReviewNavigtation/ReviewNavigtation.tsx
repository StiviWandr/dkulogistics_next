"use client"
import styles from './ReviewNavigtation.module.css'
import Link from 'next/link';
import { Text16 } from '@/UI/TextSizes/Text16/Text16';
import { usePathname } from 'next/navigation';
interface IReviewNavigtationProps {
    locale: string
}

export function ReviewNavigtation (props: IReviewNavigtationProps) {
    const path = usePathname()
    
    const localeLink = props.locale==='ru' ? '/': `/${props.locale}`

    const links = [
        {to: "reviewing", name: "Статьи для рецензирования"},
        // {to: "reviewing/send", name: "Отправить статью"},
        // {to: "reviewing/myrequests", name: "Статусы заявок"},
        // {to: "reviewing/articles", name: "Мои статьи"},
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
'use client'
import Link from 'next/link';
import styles from './Navigation.module.css'
import { Text16 } from '../../Text16/Text16';
import { usePathname } from 'next/navigation';
interface INavigationProps {

}

export function Navigation (props: INavigationProps) {
    const path = usePathname()
    const links = [
        {to: "/", name: "Главная"},
        {to: "/about", name: "О журнале"},
        {to: "/ongoing", name: "Текущий выпуск"},
        {to: "/archive", name: "Архивы"},
        {to: "/contacts", name: "Контакты"},
    ]
    return (
        <nav className={styles.navigation}>
            {
                links.map(link => {
                    return(
                        <Link className={`${styles.link} ${path===link.to ? styles.link__active : ''}`} key={link.name} href={link.to}>
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
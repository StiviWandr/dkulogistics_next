import Link from 'next/link';
import styles from './Navigation.module.css'
import Image from 'next/image'
import { Text16 } from '../../Text16/Text16';
interface INavigationProps {

}
const links = [
    {to: "/", name: "Главная"},
    {to: "/about", name: "О журнале"},
    {to: "/ongoing", name: "Текущий выпуск"},
    {to: "/archives", name: "Архивы"},
    {to: "/contacts", name: "Контакты"},
]
export function Navigation (props: INavigationProps) {
    return (
        <nav className={styles.navigation}>
            {
                links.map(link => {
                    return(
                        <Link className={styles.link} key={link.name} href={link.to}>
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
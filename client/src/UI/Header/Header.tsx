import Link from 'next/link';
import Logo from '@/src/assets/icons/header_logo.svg'
import styles from './Header.module.css'
import Image from 'next/image'
import { Navigation } from "./Navigation/Navigation"
import { Container } from '../Container/Container';
import { LanguageSelect } from './LanguageSelect/LanguageSelect';
import { UserMenu } from './UserMenu/UserMenu';
interface IHeaderProps {

}

export function Header (props: IHeaderProps) {
    return (
        <Container>
            <header className={styles.header}>
                <Link href={"/"}>
                    <Image 
                        src={Logo}
                        width={196}
                        height={70}
                        alt="Logo"

                    />
                </Link>
                <Navigation/>
                <div>
                    <LanguageSelect/>
                    <UserMenu/>
                </div>
            </header>
        </Container>
        
    );
}
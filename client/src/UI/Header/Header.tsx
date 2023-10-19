'use client'
import Link from 'next/link';
import Logo from '@/assets/icons/header_logo.svg'
import styles from './Header.module.css'
import Image from 'next/image'
import { Navigation } from "./Navigation/Navigation"
import { Container } from '../Container/Container';
import { LanguageSelect } from './LanguageSelect/LanguageSelect';
import { UserMenu } from './UserMenu/UserMenu';
import { ButtonOrange } from '../Buttons/ButtonOrange';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
interface IHeaderProps {
    locale: string
}

export function Header (props: IHeaderProps) {
    const router = useRouter()
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
                <Navigation locale={props.locale}/>
                <div className={styles.rigthmenu}>
                    <LanguageSelect/>
                    {
                        localStorage.getItem('token')?
                            <UserMenu/>:
                            <>
                                <ButtonOrange
                                    onClick={()=>{router.push("/?showAuth")}}
                                >
                                    Войти
                                </ButtonOrange>
                            </>
                    }   
                    
                </div>
            </header>
        </Container>
        
    );
}
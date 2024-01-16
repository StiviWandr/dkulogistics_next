'use client'
import {motion} from 'framer-motion'
import styles from './Promo.module.css'
import SearchIcon from "@/assets/icons/search.svg"
import { Container } from '@/UI/Container/Container';
import { useState } from 'react';
import Image from 'next/image';
import { Montserrat } from 'next/font/google'
import { Text14 } from '@/UI/TextSizes/Text14/Text14';

const montserrat = Montserrat({ subsets: ['latin'] })
interface IPromoProps {
    locale: any
}

export function Promo (props: IPromoProps) {
   
    const searchPlaceHolder = "Поиск"
    const [search, setSearch] = useState('')
    return (
        <div className={styles.promo}>
            <Container>
                <div className={styles.wrapper}>
                    <motion.div
                        initial={{y: 100, opacity: 0}}
                        animate={{y: 0, opacity: 1 }} 
                        transition={{ duration: .4, delay: 0.5 }}
                        className={styles.title}
                    >
                        <h1><b>{"Supply Chain Managment"}</b></h1>
                    </motion.div>
                    <motion.div
                        initial={{y: 100, opacity: 0}}
                        animate={{y: 0, opacity: 1 }} 
                        transition={{ duration: .4, delay: 0.8 }}
                        className={styles.input__wrapper}
                    >
                        <input
                            className={styles.search+" "+montserrat.className}
                            value={search}
                            onChange={(e:any)=>setSearch(e.target.value)}
                            placeholder={searchPlaceHolder}
                        />
                        <Image 
                            className={styles.search__img}
                            width={23}
                            height={23}
                            alt='Search'
                            src={SearchIcon}
                        />
                    </motion.div>
                    <div
                        
                        className={styles.journal_index}
                    >
                        <motion.div
                            initial={{y: 100, opacity: 0}}
                            animate={{y: 0, opacity: 1 }} 
                            transition={{ duration: .4, delay: 1.2}}
                        >
                            <Text14>ISSN 2323 2323 (Print)</Text14>
                        </motion.div>
                        <motion.div
                            initial={{y: 100, opacity: 0}}
                            animate={{y: 0, opacity: 1 }} 
                            transition={{ duration: .4, delay: 1.6}}
                        >
                            <Text14>ISSN 2323 2323 (Print)</Text14>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
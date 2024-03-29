'use client'
import styles from './UserMenu.module.css'
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/helpers/hooks/redux';
import { ButtonOrange } from '@/UI/Buttons/ButtonOrange/ButtonOrange';
import { checkAuth, logout, setShowAuthModal } from '@/Store/Slices/userSlice';
import { Text14 } from '@/UI/TextSizes/Text14/Text14';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
export const UserMenu = ()=> {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const {token, info} = useAppSelector(state=>state.user)
    const dispatch = useAppDispatch();
    const t = useTranslations('Меню')
    const buttonHandler = () => {
        setIsOpen(!isOpen)
    }
    const logoutFunc = () => {
        dispatch(logout({router: router}))
        setIsOpen(false)
    }
    useEffect(()=> {
        if(token && token!=="" && token !==null){
            dispatch(checkAuth(router))
        }
    }, [dispatch, router, token])
    return (
        <>
            {
                (token && info) ? 
                <motion.div initial={false} animate={isOpen ? "open" : "closed" } className={styles.menu}>
                    <motion.button className={styles.button} whileTap={{ scale: 0.97 }} onClick={buttonHandler}>
                        {info?.name} {info?.lastName}
                        <motion.div variants={{
                                open: { rotate: 180 },
                                closed: { rotate: 0 }
                            }} transition={{ duration: 0.2 }} style={{ originY: 0.55 }}
                        >
                            <svg width="15" height="15" viewBox="0 0 20 20">
                                <path d="M0 7 L 20 7 L 10 16" />
                            </svg>
                        </motion.div>
                    </motion.button>
                    <motion.ul className={styles.list} variants={{
                        open: {
                            clipPath: "inset(0% 0% 0% 0% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.7,
                                delayChildren: 0.3,
                                staggerChildren: 0.05
                            }
                        },
                        closed: {
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.3
                            }
                        }
                        }} style={{ pointerEvents: isOpen ? "auto" : "none" }}>
                        <motion.li className={styles.item} variants={itemVariants} onClick={buttonHandler}>
                            <Link href={"/account"}>
                                {t('Редактировать профиль')}
                            </Link>
                        </motion.li>
                        {
                            (info?.role==="admin" || info?.role==="reviewer") &&
                            <>
                                <motion.li className={styles.item}variants={itemVariants} onClick={buttonHandler}>
                                    <Link href={"/reviewing"}>
                                        {t("Панель рецензирования")}
                                    </Link>
                                </motion.li>
                                
                            </>
                            
                        }
                        {
                            (info?.role==="admin") &&
                            <>
                                <motion.li className={styles.item}variants={itemVariants} onClick={buttonHandler}>
                                    <Link href={"/admin"}>
                                        {t("Админ панель")}
                                    </Link>
                                </motion.li>
                                
                            </>
                            
                        }
                        <motion.li className={styles.item}variants={itemVariants} onClick={buttonHandler}>
                            <div onClick={logoutFunc}>
                                {t("Выйти")}
                            </div>
                        </motion.li>

                    </motion.ul>
                </motion.div>
                :

                <ButtonOrange
                    onClick={()=>dispatch(setShowAuthModal(true))}
                >
                    <Text14>
                        {t("Войти")}
                    </Text14>
                    
                </ButtonOrange>
            }
            
        </>
        
    );
}
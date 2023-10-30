'use client'
import { Modal } from "../Modal/Modal";
import { useTranslation } from 'next-i18next'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setShowAuthModal } from "@/Store/Slices/clientSlices/userSlice";
import {useEffect} from 'react'
import { AuthForm } from "@/Modules/AuthForm/AuthForm";
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import Link from "next/link";

export default function AuthModal (props: {locale: string}) {
    const dispatch = useAppDispatch()
    const { t } = useTranslation(['auth'])
    const { showAuthModal } = useAppSelector(state => state.user)
    const localeLink = props.locale==='ru' ? '/': `/${props.locale}`
    const closeAuth = () => {
        dispatch(setShowAuthModal(false))
    }
    return (
        <Modal 
            isOpen = {showAuthModal}
            onClose={closeAuth}
            title={t('login')}
        >
            <div>
                <AuthForm/>
                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: "wrap", marginTop: 40}}>
                    <Text20>{t('remind_password')}</Text20>
                    <Link href={`/${props.locale}/signup`}>
                        <Text20>{t('register')}</Text20>
                    </Link>
                    
                </div>
            </div>
        </Modal>
    )
}
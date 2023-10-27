'use client'
import { Modal } from "../Modal/Modal";
import { useTranslation } from 'next-i18next'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setShowAuthModal } from "@/Store/Slices/clientSlices/userSlice";
import {useEffect} from 'react'
import { AuthForm } from "@/Modules/AuthForm/AuthForm";
export default function AuthModal () {
    const dispatch = useAppDispatch()
    const { t } = useTranslation(['authModal'])
    const { showAuthModal } = useAppSelector(state => state.user)
    
    const closeAuth = () => {
        dispatch(setShowAuthModal(false))
    }
    return (
        <Modal 
            isOpen = {showAuthModal}
            onClose={closeAuth}
            title={t('title')}
        >
            <div>
                <AuthForm/>
            </div>
        </Modal>
    )
}
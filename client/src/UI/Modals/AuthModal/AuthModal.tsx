'use client'
import { Modal } from "../Modal/Modal";
import { useTranslation } from 'next-i18next'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setShowAuthModal } from "@/Store/Slices/clientSlices/userSlice";
import {useEffect} from 'react'
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
                asdasdads
            </div>
        </Modal>
    )
}
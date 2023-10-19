'use client'
import { Modal } from "../Modal/Modal";
import { useSearchParams } from "next/navigation"
import { useTranslation } from 'next-i18next'
export default function AuthModal () {
    const searchParams = useSearchParams()
    const { t } = useTranslation(['authModal'])
    const showAuth = searchParams.get('authModal')?true:false
    const closeAuth = () => {
        searchParams.delete()
    }
    return (
        <Modal 
            isOpen = {showAuth}
            onClose={closeAuth}
            title={t('title')}
        >
            <form>

            </form>
        </Modal>
    )
}
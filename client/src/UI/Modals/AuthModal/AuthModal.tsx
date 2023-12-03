'use client'
import { Modal } from "../Modal/Modal";
import { useTranslation } from 'next-i18next'
import { useAppDispatch, useAppSelector } from "@/helpers/hooks/redux";
import { setShowAuthModal } from "@/Store/Slices/userSlice";
import { AuthForm } from "@/Modules/Forms/AuthForm/AuthForm";
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import { useRouter } from 'next/navigation';

export default function AuthModal (props: {locale: string}) {
    const dispatch = useAppDispatch()
    const { t } = useTranslation(['auth'])
    const { showAuthModal } = useAppSelector(state => state.user)
    const localeLink = props.locale==='ru' ? '': `/${props.locale}`
    const router = useRouter()
    const closeAuth = () => {
        dispatch(setShowAuthModal(false))
    }
    const redirectToSignUp = () => {
        dispatch(setShowAuthModal(false))
        console.log(localeLink+'/signup');
        
        router.push(localeLink+'/signup')
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
                    <div onClick={redirectToSignUp} >
                        <Text20>{t('register')}</Text20>
                    </div>
                    
                </div>
            </div>
        </Modal>
    )
}
'use client'
import { Modal } from "../Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks/redux";
import { setShowAuthModal } from "@/Store/Slices/userSlice";
import { AuthForm } from "@/Modules/Forms/AuthForm/AuthForm";
import { Text20 } from "@/UI/TextSizes/Text20/Text20";
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";

export default function AuthModal (props: {locale: string}) {
    const dispatch = useAppDispatch()
    const t = useTranslations('Aвторизация')
    const { showAuthModal } = useAppSelector(state => state.user)
    const localeLink = props.locale==='ru' ? '': `/${props.locale}`
    const router = useRouter()
    const closeAuth = () => {
        dispatch(setShowAuthModal(false))
    }
    const redirectToSignUp = () => {
        dispatch(setShowAuthModal(false))
        router.push(localeLink+'/signup')
    }
    return (
        <Modal 
            isOpen = {showAuthModal}
            onClose={closeAuth}
            title={t("Вход")}
        >
            <div>
                <AuthForm/>
                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: "wrap", marginTop: 40}}>
                    <Text20>{""}</Text20>
                    <div style={{cursor: 'pointer'}} onClick={redirectToSignUp} >
                        <Text20>{t("Зарегистрироваться")}</Text20>
                    </div>
                    
                </div>
            </div>
        </Modal>
    )
}
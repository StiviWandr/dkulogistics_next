import { Id, ToastContent, ToastOptions, toast } from "react-toastify"


const styles: ToastOptions<{}> | undefined = {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const randomNotifyMessages = ["Загружаем данные", "Гоняем голубей", "Защищаемся от кабельщиков", "Соединяем со спутником", "Загружаем данные с Марса", "Смотрим в настоящее", "Взламываем пентагон"]
export const getRandomNotifyMessage = () => randomNotifyMessages[Math.floor(Math.random() * randomNotifyMessages.length)]

export const createLoadingNotify = (message: ToastContent<unknown>, newStyles?: ToastOptions<{}> | undefined): Id => toast.loading(message, { ...styles, ...newStyles })
export const closeLoadingNotify = (id: Id) => toast.done(id)
export const createErrorNotify = (message: ToastContent<unknown>) => toast.error(message + ' 😯', { ...styles, toastId: 'unique_id' })
export const createWarningNotify = (message: ToastContent<unknown>) => toast.warning(message + ' 😯', { ...styles, toastId: 'unique_id' })
export const createFetchingNotify = (myPromise: Promise<unknown> | (() => Promise<unknown>), messages?: { pending?: string, error?: string, success?: string }) => {
    toast.promise(myPromise, {
        pending: messages?.pending || 'Сохраняем изменения',
        error: messages?.error || 'Что то пошло не так!',
        success: messages?.success || "Изменения сохранены"
    }, styles)
}


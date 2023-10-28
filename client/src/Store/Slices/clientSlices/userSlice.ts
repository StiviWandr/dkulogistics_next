
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { ILoginResponse } from '@/helpers/interfaces/Auth/responses'
import { ILoginRequest } from '@/helpers/interfaces/Auth/requests'
import { createErrorNotify } from '@/helpers/functions/Toasts/toastsNotifications'
import { useRouter } from 'next-intl/client'

export const authorization = (hash: string) => ({ headers: { Authorization: "Bearer " + hash } })

interface IUserSliceState {
    showAuthModal: boolean,
    loginError: string,
    user_hash: string,
    needRefresh: boolean,
    stayLogged: boolean,
    logged: boolean
}

const initialState: IUserSliceState = {
    showAuthModal: false,
    loginError: "",
    needRefresh: false,
    user_hash: "",
    stayLogged: false,
    logged: false,
}


export const login = createAsyncThunk(
    'users/login',
    async ({ email, password }: ILoginRequest, { dispatch }) => {
        try {
            const router = useRouter()
            const data = { email, password }
            const response = await api.post(`/login/lk-auth`, data);
            dispatch(setUser(response.data.data.hash))
            setTimeout(async () => {
                dispatch(setLoginError(""))
                router.push("/personalaccount")
            }, 2500)
            
        } catch (e: any) {
            setTimeout(() => {
                if (!e?.response?.status) {
                    dispatch(setLoginError("Сервер не отвечает"))
                    createErrorNotify('Сервер не отвечает')
                } else if (e.response.status === 500) {
                    dispatch(setLoginError("Сервер не отвечает"))
                } else if (e.response.data.errors.code === 404) {
                    dispatch(setLoginError("Пользователь не синхронизирован, введите данные для входа повторно"))
                } else {
                    createErrorNotify('Сервер не отвечает')
                    dispatch(setLoginError("Неправильный логин или пароль"))
                }
            }, 1000)
        }
    }
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setShowAuthModal: (state, action: PayloadAction<boolean>) => {
            state.showAuthModal = action.payload
        },
        setLoginError: (state, action: PayloadAction<string>) => {
            state.loginError = action.payload
        },
        setUser: (state, action: PayloadAction<string>) => {
            state.user_hash = action.payload
        },
    },
})


export const { setShowAuthModal, setLoginError, setUser } = userSlice.actions

export default userSlice.reducer
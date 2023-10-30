'use client'
import { IRegisterRequest } from './../../../helpers/interfaces/Auth/requests';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { ILoginRequest } from '@/helpers/interfaces/Auth/requests'
import { createErrorNotify, createLoadingNotify } from '@/helpers/functions/Toasts/toastsNotifications'
import { redirect } from 'next/navigation';

interface IUserSliceState {
    showAuthModal: boolean,
    loginError: string,
    registerError: string,
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
    registerError: ""
}


export const login = createAsyncThunk(
    'users/login',
    async ({ email, password }: ILoginRequest, { dispatch }) => {
        try {
            
            const data = { email, password }
            const response = await api.post(`/login`, data);
            dispatch(setUser(response.data.data.hash))
            setTimeout(async () => {
                dispatch(setLoginError(""))
                redirect("/account")
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
export const registerUser = createAsyncThunk(
    'users/register',
    async (payload: IRegisterRequest, thunkApi) => {
        try {
            
            createLoadingNotify("Регистрация...")
            const res = await api.post('/registration', payload);
            thunkApi.dispatch(userSlice.actions.loginafterRegister(res.data));
            redirect('/account');
            return res.data;
        } catch (e: any) {
            if (e.response && e.response.data) {
                thunkApi.dispatch(userSlice.actions.catchRegisterError(e.response.data.message));
            }
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
        loginafterRegister:(state, action)=> {
            state.user_hash = action.payload.user;
        },
        catchRegisterError: (state, action) => {
            state.registerError = action.payload;
        },
        catchLoginError: (state, action) => {
            state.loginError = action.payload;
        },
        
    },
})


export const { setShowAuthModal, setLoginError, setUser, loginafterRegister } = userSlice.actions

export default userSlice.reducer
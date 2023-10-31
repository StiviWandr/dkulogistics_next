'use client'
import { IRegisterRequest } from './../../../helpers/interfaces/Auth/requests';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { ILoginRequest } from '@/helpers/interfaces/Auth/requests'
import { closeLoadingNotify, createErrorNotify, createLoadingNotify } from '@/helpers/functions/Toasts/toastsNotifications'
import { redirect } from 'next/navigation';

interface IUserSliceState {
    showAuthModal: boolean,
    loginError: string,
    registerError: string,
    info: any,
    token: string,
    needRefresh: boolean,
}

const initialState: IUserSliceState = {
    showAuthModal: false,
    info: null,
    loginError: "",
    needRefresh: false,
    token: "",
    registerError: ""
}


export const login = createAsyncThunk(
    'users/login',
    async ({ email, password, router }: ILoginRequest, { dispatch }) => {
        try {
            
            const data = { email, password }
            const response = await api.post(`/login`, data);
            await dispatch(setUserToken(response.data.accessToken))
            await dispatch(setUser(response.data.user))
            await dispatch(setShowAuthModal(false))
            // await router.push("/account")
            
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
export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (payload, thunkApi) => {
        try{
            const response = await api.get(`/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            
            return response.data;
        }catch(e: any){
            if (e.response && e.response.data) {
                thunkApi.dispatch(userSlice.actions.catchLoginError(e.response.data));
            } 
        }
        
    }
)
export const registerUser = createAsyncThunk(
    'users/register',
    async (payload: {data: IRegisterRequest, router: any}, thunkApi) => {
        try {
            
            createLoadingNotify("Регистрация...")
            const res = await api.post('/registration', payload);
            thunkApi.dispatch(userSlice.actions.loginafterRegister({token: res.data.accessToken, user: res.data.user}));
            closeLoadingNotify("Регистрация...")
            await payload.router.push("/")
        } catch (e: any) {
            if (e.response && e.response.data) {
                thunkApi.dispatch(userSlice.actions.catchRegisterError(e.response.data.message));
            }
        }
    }
)
export const logout = createAsyncThunk(
    'logout/users',
    async (payload, thunkAPI) => {
        await api.post('/logout');
        thunkAPI.dispatch(userSlice.actions.logoutUser());
        return redirect('/');
    }
)
export const getUserInfo = createAsyncThunk(
    'users/getInfo',
    async (id: string, { dispatch }) => {
        try {
            
            const response = await api.get(`/user/${id}`);
            await dispatch(setUser(response.data))
            
            await dispatch(setLoginError(""))
            await dispatch(setShowAuthModal(false))
            // await router.push("/account")
            
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
        setUserToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        loginafterRegister:(state, action: PayloadAction<{token: string, user: any}>)=> {
            state.token = action.payload.token;
            state.info = action.payload.user;
        },
        catchRegisterError: (state, action) => {
            state.registerError = action.payload;
        },
        catchLoginError: (state, action) => {
            state.loginError = action.payload;
        },
        setUser: (state, action) => {
            state.info = action.payload;
        },
        logoutUser: (state) => {
            state.info = null;
            state.token = "";
        }
        
    },
})


export const { setShowAuthModal, setLoginError, setUserToken, loginafterRegister, setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
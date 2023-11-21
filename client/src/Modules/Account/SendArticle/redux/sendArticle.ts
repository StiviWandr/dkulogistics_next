'use client'
import { IRegisterRequest } from '../../../../helpers/interfaces/Auth/requests';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { ILoginRequest } from '@/helpers/interfaces/Auth/requests'
import { closeLoadingNotify, createErrorNotify, createLoadingNotify } from '@/helpers/functions/Toasts/toastsNotifications'
import { redirect } from 'next/navigation';
import initTranslations from '@/app/i18n';


interface IUserSliceState {
    currentStep: number, 
    articleData: {
        name: string,
        authors: Array<any>,
        annotation: string,
        keywords: Array<string>,
        files: Array<any>,
        isPaid: boolean
    }
}

const initialState: IUserSliceState = {
    currentStep: 1,
    articleData: {
        name: "",
        authors: [],
        annotation: "",
        keywords: [],
        files: [],
        isPaid: false
    }
}


export const login = createAsyncThunk(
    'users/login',
    async ({ email, password, router }: ILoginRequest, { dispatch }) => {
        try {
            
            const data = { email, password }
            const response = await api.post(`/login`, data);
            await dispatch(setShowAuthModal(false))

        } catch (e: any) {
           
        }
    }
)

export const sendArticle = createSlice({
    name: 'sendArticle',
    initialState,
    reducers: {
        setShowAuthModal: (state, action: PayloadAction<boolean>) => {
            
        },
        setLoginError: (state, action: PayloadAction<string>) => {
            
        },
    },
})


export const { setShowAuthModal, setLoginError } = sendArticle.actions

export default sendArticle.reducer
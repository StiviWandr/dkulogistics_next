'use client'
import { IRegisterRequest } from '../../../../helpers/interfaces/Auth/requests';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { ILoginRequest } from '@/helpers/interfaces/Auth/requests'
import { closeLoadingNotify, createErrorNotify, createLoadingNotify } from '@/helpers/functions/Toasts/toastsNotifications'
import { redirect } from 'next/navigation';
import initTranslations from '@/app/i18n';


interface IUserSliceState {
    currentSlide: number, 
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
    currentSlide: 0,
    articleData: {
        name: "",
        authors: [],
        annotation: "",
        keywords: [],
        files: [],
        isPaid: false
    }
}


export const sendArticle = createAsyncThunk(
    'article/sendArticle',
    async ({ name, authors, annotation, keywords, files, isPaid }: typeof initialState.articleData, { dispatch }) => {
        try {
            
            const data = { name, authors, annotation, keywords, files }
            const response = await api.post(`/login`, data);
            await dispatch(setShowAuthModal(false))

        } catch (e: any) {
           
        }
    }
)

export const sendArticleSlice = createSlice({
    name: 'sendArticle',
    initialState,
    reducers: {
        setShowAuthModal: (state, action: PayloadAction<boolean>) => {
            
        },
        setCurrentSlide: (state, action: PayloadAction<number>) => {
            state.currentSlide = action.payload
        },
        setLoginError: (state, action: PayloadAction<string>) => {
            
        },
    },
})


export const { setShowAuthModal, setLoginError, setCurrentSlide, } = sendArticleSlice.actions

export default sendArticleSlice.reducer
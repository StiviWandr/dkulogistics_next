'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { createErrorNotify, createFetchingNotify } from '@/helpers/functions/Toasts/toastsNotifications'


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


export const sendArticleFetch = createAsyncThunk(
    'article/sendArticle',
    async (articleData: any, { dispatch, getState }) => {
        try {
            const promise = api.post("/articles", articleData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } )
            await promise
            createFetchingNotify(promise, {success: "Статья отправлена"})
        } catch (e: any) {
           createErrorNotify(e.response.data.message)
        }
    }
)

export const sendArticleSlice = createSlice({
    name: 'sendArticleSlice',
    initialState,
    reducers: {
        setSendArticleData: (state, action: PayloadAction<any>) => {
            state.articleData = action.payload
        },
        setCurrentSlide: (state, action: PayloadAction<number>) => {
            state.currentSlide = action.payload
        },
        
    },
})


export const { setSendArticleData, setCurrentSlide, } = sendArticleSlice.actions

export default sendArticleSlice.reducer
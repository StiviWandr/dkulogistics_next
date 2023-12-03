
'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { createErrorNotify } from '@/helpers/functions/Toasts/toastsNotifications';

interface IReviewingArticlesliceState {
    reviewingArticles: Array<any>
}

const initialState: IReviewingArticlesliceState = {
    reviewingArticles: []
}


export const getReviewingArticles = createAsyncThunk(
    'ReviewingArticles/get',
    async (_, { dispatch }) => {
        try {
            const response = await api.get('/review-articles');
            dispatch(setReviewingArticles(response.data));
        } catch (error) {
            createErrorNotify("Ошибка при получении журналов")
        }
    }
)


export const reviewingArticleslice = createSlice({
    name: 'reviewingArticleslice',
    initialState,
    reducers: {
        setReviewingArticles: (state: IReviewingArticlesliceState, action: PayloadAction<any>)=>{
            state.reviewingArticles = action.payload
        }
        
    },
})


export const { setReviewingArticles } = reviewingArticleslice.actions

export default reviewingArticleslice.reducer
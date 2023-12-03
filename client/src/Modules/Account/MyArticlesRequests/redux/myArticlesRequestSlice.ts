
'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { createErrorNotify } from '@/helpers/functions/Toasts/toastsNotifications';
import { RootState } from '@/Store/store';

interface ImyArticlesRequestSliceState {
    myArticlesRequests: Array<any>
}

const initialState: ImyArticlesRequestSliceState = {
    myArticlesRequests: []
}


export const getMyArticlesRequests = createAsyncThunk(
    'myArticlesRequests/get',
    async (_, { dispatch }) => {
        try {
            const response = await api.get('/user-articles');
            dispatch(setMyArticlesRequests(response.data));
        } catch (error) {
            createErrorNotify("Ошибка при получении журналов")
        }
    }
)


export const myArticlesRequestSlice = createSlice({
    name: 'myArticlesRequestSlice',
    initialState,
    reducers: {
        setMyArticlesRequests: (state: ImyArticlesRequestSliceState, action: PayloadAction<any>)=>{
            state.myArticlesRequests = action.payload
        }
        
    },
})


export const { setMyArticlesRequests } = myArticlesRequestSlice.actions

export default myArticlesRequestSlice.reducer
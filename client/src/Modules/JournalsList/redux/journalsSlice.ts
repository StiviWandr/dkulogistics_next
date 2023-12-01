
'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '@/api/api'
import { createErrorNotify } from '@/helpers/functions/Toasts/toastsNotifications';
import { RootState } from '@/Store/store';

interface IjournalsSliceState {
    journals: Array<IJournal>
}

const initialState: IjournalsSliceState = {
    journals: []
}


export const getJournals = createAsyncThunk(
    'journals/get',
    async (_, { dispatch }) => {
        try {
            const response = await api.get('/journals');
            dispatch(setJournals(response.data));
        } catch (error) {
            createErrorNotify("Ошибка при получении журналов")
        }
    }
)
export const deleteJournal = createAsyncThunk("",
    async (id: string, { dispatch, getState }) => {
        try {
            await api.delete(`/journals/${id}`);
            const state = getState() as RootState
            dispatch(setJournals(state.journals.journals.filter((journal) => journal._id !== id)));
        } catch (error) {
            createErrorNotify('Ошибка при удалении журнала');
        }
    }
);

export const journalsSlice = createSlice({
    name: 'journalsSlice',
    initialState,
    reducers: {
        setJournals: (state: IjournalsSliceState, action: PayloadAction<Array<IJournal>>)=>{
            state.journals = action.payload
        }
        
    },
})


export const { setJournals } = journalsSlice.actions

export default journalsSlice.reducer
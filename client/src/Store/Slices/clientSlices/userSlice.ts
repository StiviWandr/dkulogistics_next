
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


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

export interface ApiGetOwnRolesPayload {
    finishLoading: boolean
    startLoading: boolean
}



export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setShowAuthModal: (state, action: PayloadAction<boolean>) => {
            state.showAuthModal = action.payload
        }
    },
})


export const { setShowAuthModal } = userSlice.actions

export default userSlice.reducer
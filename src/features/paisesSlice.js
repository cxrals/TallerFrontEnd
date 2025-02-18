import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    listaPaises: [],
}

export const paisesSlice = createSlice({
    name: 'paises',
    initialState,
    reducers: {
        guardarPaises: (state, action) => {
            state.listaPaises = action.payload
        }
    }   
})

export const { guardarPaises } = paisesSlice.actions
export default paisesSlice.reducer;
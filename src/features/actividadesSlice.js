import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listaActividades: [],
}

export const actividadesSlice = createSlice({
    name: 'actividades',
    initialState,
    reducers: {
        guardarActividades: (state, action) => {
            state.listaActividades = action.payload
        }
    }   
})

export const { guardarActividades } = actividadesSlice.actions
export default actividadesSlice.reducer;
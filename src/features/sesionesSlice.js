import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listaSesiones: [],
}

export const sesionesSlice = createSlice({
    name: 'sesiones',
    initialState,
    reducers: {
        guardarSesiones: (state, action) => {
            state.listaSesiones = action.payload
        },
        agregarSesiones: (state, action) => {
            state.listaSesiones.push(action.payload)
        },
        eliminarSesion: (state, action) => {
            state.listaSesiones = state.listaSesiones.filter(sesion => sesion.id !== action.payload)
        },
    }   
})

export const { guardarSesiones, agregarSesiones, eliminarSesion } = sesionesSlice.actions
export default sesionesSlice.reducer;
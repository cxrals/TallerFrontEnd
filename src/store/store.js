import { configureStore } from "@reduxjs/toolkit";
import paisesReducer from "../features/paisesSlice";
import actividadesReducer from "../features/actividadesSlice";
import sesionesReducer from "../features/sesionesSlice";
import spinnerReducer from "../features/spinnerSlice";

export const store = configureStore({
    reducer:{
        paises: paisesReducer,
        actividades: actividadesReducer,
        sesiones: sesionesReducer,
        spinner: spinnerReducer
    }
})
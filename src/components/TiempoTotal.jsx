import React from 'react'
import { useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";

const TiempoTotal = () => {
  const sesiones = useSelector(state => state.sesiones.listaSesiones)
  const tiempoTotal = sesiones.reduce((total, sesion) => total + Number(sesion.tiempo), 0);
  
  return (
    <div className="card">
        <h5 className="card-header">Tiempo Total (minutos)</h5>
        <div className="card-body">
            <p className="numeroTotales">{tiempoTotal}</p>
        </div>
    </div>
  )
}

export default TiempoTotal
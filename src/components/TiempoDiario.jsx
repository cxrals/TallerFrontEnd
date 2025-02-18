import React from 'react'
import { useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";

const TiempoDiario = () => {
  const sesiones = useSelector(state => state.sesiones.listaSesiones)
  const fechaHoy = new Date().toISOString().split('T')[0];
  const tiempoTotal = sesiones.filter(sesion => sesion.fecha === fechaHoy).reduce((total, sesion) => total + Number(sesion.tiempo), 0);

  return (
    <div className="card">
      <h5 className="card-header">Tiempo Diario (minutos)</h5>
      <div className="card-body">
        <p className="numeroTotales">{tiempoTotal}</p>
      </div>
    </div>
  )
}

export default TiempoDiario
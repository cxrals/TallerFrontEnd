import React from 'react'
import { useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";

const EvolucionPersonal = () => {
  const sesiones = useSelector(state => state.sesiones.listaSesiones)
  const fechaHoy = new Date().toISOString().split('T')[0];
  const fechaAyer = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

  const tiempoHoy = sesiones.filter(sesion => sesion.fecha === fechaHoy).reduce((total, sesion) => total + Number(sesion.tiempo), 0);
  const tiempoAyer = sesiones.filter(sesion => sesion.fecha === fechaAyer).reduce((total, sesion) => total + Number(sesion.tiempo), 0);

  const mensaje = tiempoHoy > tiempoAyer ? '¡Bien hecho!' : '¡Que no decaiga!';

  return (
    <div className="card evolucionPersonal">
        <h5 className="card-header">Evolución Personal</h5>
        <div className="card-body d-flex align-items-center">
            <p className="evolucionPersonalTexto">{mensaje}</p>
        </div>
    </div>
  )
}

export default EvolucionPersonal
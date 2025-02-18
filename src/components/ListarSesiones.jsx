import React, { useState } from 'react'
import { useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";
import Sesion from './Sesion';

const ListarSesiones = () => {
    const sesiones = useSelector(state => state.sesiones.listaSesiones)
    const [filtro, setFiltro] = useState("all");

    const filtrarSesiones = () => {
        const ahora = new Date();
        return sesiones.filter(sesion => {
            const fechaSesion = new Date(sesion.fecha);
            if (filtro === "week") {
                const haceUnaSemana = new Date();
                haceUnaSemana.setDate(ahora.getDate() - 7);
                return fechaSesion >= haceUnaSemana;
            }
            if (filtro === "month") {
                const haceUnMes = new Date();
                haceUnMes.setMonth(ahora.getMonth() - 1);
                return fechaSesion >= haceUnMes;
            }
            return true; // "all" muestra todas las sesiones
        });
    };

  return (
      <div className="card mt-4">
          <h5 className="card-header">Listado de Sesiones de Ejercicio</h5>
          <div className="card-body">
              <div class="row justify-content-end">
                  <div class="col-3">
                  <div className="mb-3">
                      <select className="form-control" value={filtro} onChange={e => setFiltro(e.target.value)}>
                          <option value="all">Todas</option>
                          <option value="week">Última semana</option>
                          <option value="month">Último mes</option>
                      </select>
                  </div>
                  </div>
              </div>

              <ul className="list-group">
                    {filtrarSesiones().map(sesion => (
                        <Sesion key={sesion.id} {...sesion} />
                    ))}
              </ul>
          </div>
      </div>
  );
}

export default ListarSesiones
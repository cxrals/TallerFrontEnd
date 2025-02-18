import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import TiempoDiario from './TiempoDiario'
import TiempoTotal from './TiempoTotal'
import EvolucionPersonal from './EvolucionPersonal'

const Informes = () => {
  return (
    <>
        <div class="row mt-4">
            <div class="col-4">
                <TiempoDiario />
            </div>
            <div class="col-4">
                <TiempoTotal />
            </div>
            <div class="col-4">
                <EvolucionPersonal />
            </div>
        </div>
    </>
  )
}

export default Informes
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import MinutosPorActividad from './MinutosPorActividad'
import MinutosUltimosSieteDias from './MinutosUltimosSieteDias'

const Graficas = () => {
  return (
    <>
        <div class="row mt-4">
            <div class="col-6">
                <MinutosPorActividad />
            </div>
            <div class="col-6">
                <MinutosUltimosSieteDias />
            </div>
        </div>
    </>
  )
}

export default Graficas
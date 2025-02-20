import React from 'react'
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    }
  }
};

const MinutosPorActividad = () => {
  const sesiones = useSelector(state => state.sesiones.listaSesiones)
  const actividades = useSelector(state => state.actividades.listaActividades);

  const actividadMap = actividades.map(actividad => ({
    actividad: actividad.nombre,
    cantidadSesiones: sesiones.filter(sesion => sesion.idActividad === actividad.id).length
  })).filter(item => item.cantidadSesiones > 0);

  return (
    <div className="card">
      <h5 className="card-header">Minutos Por Actividad</h5>
      <div className="card-body">
        <Bar options={options} data={{
          labels: actividadMap.map(item => item.actividad),
          datasets: [
            {
              label: 'Actividad',
              data: actividadMap.map(item => item.cantidadSesiones),
              backgroundColor: 'rgba(58, 51, 121, 0.5)',
            }
          ],
        }} />
      </div>
    </div>
  )
}

export default MinutosPorActividad
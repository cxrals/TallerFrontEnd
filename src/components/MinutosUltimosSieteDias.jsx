import React from 'react'
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
};

const MinutosUltimosSieteDias = () => {
  const sesiones = useSelector(state => state.sesiones.listaSesiones);

  // obtener las etiquetas de los últimos 7 días
  const obtenerEtiquetas = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const fechasUltimos7Dias = obtenerEtiquetas();

  const minutosPorDia = fechasUltimos7Dias.map(day => {
    const sesionesDelDia = sesiones.filter(sesion => sesion.fecha === day);
    const totalMinutos = sesionesDelDia.reduce((total, sesion) => total + sesion.tiempo, 0);
    return totalMinutos;
  });

  return (
    <div className="card">
      <h5 className="card-header">Minutos de los últimos siete días</h5>
      <div className="card-body">
        <Line options={options} data={{
          labels: fechasUltimos7Dias,
          datasets: [
            {
              label: 'Minutos por día',
              data: minutosPorDia,
              borderColor: 'rgba(58, 51, 121, 0.5)',
              backgroundColor: 'rgba(58, 51, 121, 0.5)',
            }
          ],
        }} />
      </div>
    </div>
  )
}

export default MinutosUltimosSieteDias
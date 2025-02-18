import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { eliminarSesion } from '../features/sesionesSlice';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sesion = ({ id, idActividad, tiempo, fecha }) => {

    const movetrack = 'https://movetrack.develotion.com/'
    const dispatch = useDispatch();
    const [mensaje, setMensaje] = useState(null);
    const actividades = useSelector(state => state.actividades.listaActividades)
    const actividad = actividades.find(a => a.id === idActividad)
    const urlImagen = `https://movetrack.develotion.com/imgs/${actividad.imagen}.png`;

    const handleDelete = () => {
        const params = {
            "idRegistro": id,
        };

        fetch(`${movetrack}/registros.php?` + new URLSearchParams(params), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'iduser': localStorage.getItem('userId'),
                'apikey': localStorage.getItem('apiKey')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.codigo === 404) {
                setMensaje(data.mensaje);
            } else {
                setMensaje(data.mensaje);
                dispatch(eliminarSesion(id));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión');
        });
    };

    return (
        <li
            key={id}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <div>
                <img
                    src={urlImagen}
                    alt="Sesion"
                    width="30"
                    className="me-2"
                />
                {actividad.nombre} - {tiempo} minutos el {fecha}
            </div>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                <i className="bi bi-trash3"></i>
            </button>
        </li>
    )
}

export default Sesion
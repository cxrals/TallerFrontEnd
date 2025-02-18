import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { agregarSesiones } from "../features/sesionesSlice";

const AgregarSesion = () => {
    const movetrack = 'https://movetrack.develotion.com'
    const dispatch = useDispatch();
    const campoActividad = useRef(null);
    const campoTiempo = useRef(null);
    const campoFecha = useRef(null);
    const [mensaje, setMensaje] = useState(null)

    const actividades = useSelector(state => state.actividades.listaActividades);

    const agregarSesion = () => {
        const bodyData = {
            "idActividad": campoActividad.current.value,
            "idUsuario": localStorage.getItem('userId'),
            "tiempo": campoTiempo.current.value,
            "fecha": campoFecha.current.value
        };

        console.log(campoFecha.current.value);
    
        fetch(`${movetrack}/registros.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': localStorage.getItem('apiKey'),
                'iduser': localStorage.getItem('userId')
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const sesion = {
                "id": data.idRegistro,
                "idActividad": Number(campoActividad.current.value),
                "idUsuario": localStorage.getItem('userId'),
                "tiempo": campoTiempo.current.value,
                "fecha": campoFecha.current.value
            }
            dispatch(agregarSesiones(sesion));
            setMensaje(data.mensaje);
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión');
        });
    }

    return (
        <div className="card">
            <h5 className="card-header">Agregar Sesión de Ejercicio</h5>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="actividad">Actividad</label>
                            <select
                                className="form-control"
                                id="actividad"
                                required
                                ref={campoActividad}
                            >
                                {actividades.map(actividad => (
                                    <option key={actividad.id} value={actividad.id}>{actividad.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="tiempo">Tiempo</label>
                            <input
                                type="number"
                                className="form-control"
                                id="tiempo"
                                required
                                ref={campoTiempo}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                ref={campoFecha}
                                max={new Date().toISOString().split("T")[0]}
                                defaultValue={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>
                    </div>
                    <div className="col">
                        <input
                            type="button"
                            className="btn btn-primary mt-4"
                            value="Agregar"
                            onClick={agregarSesion}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarSesion;

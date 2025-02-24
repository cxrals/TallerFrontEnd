import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { agregarSesiones } from "../features/sesionesSlice";
import { spinnerCargando } from "../features/spinnerSlice";
import Spinner from "./Spinner";

const AgregarSesion = () => {
    const movetrack = 'https://movetrack.develotion.com'
    const dispatch = useDispatch();
    const cargando = useSelector(state => state.spinner.loading)
    const campoActividad = useRef(null);
    const campoTiempo = useRef(null);
    const campoFecha = useRef(null);
    const [mensaje, setMensaje] = useState(null)
    const [botonAgregar, setBotonAgregar] = useState(false);

    const actividades = useSelector(state => state.actividades.listaActividades);

    const agregarSesion = () => {
        dispatch(spinnerCargando(true))
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
            dispatch(spinnerCargando(false))
            const sesion = {
                "id": data.idRegistro,
                "idActividad": Number(campoActividad.current.value),
                "idUsuario": localStorage.getItem('userId'),
                "tiempo": Number(campoTiempo.current.value),
                "fecha": campoFecha.current.value
            }
            dispatch(agregarSesiones(sesion));
            setMensaje(data.mensaje);
        })
        .catch(error => {
            console.error('Error:', error);
            dispatch(spinnerCargando(false))
            setMensaje('Error en la conexión');
        });
    }

    const validar = e => {
        campoActividad.current.value && campoTiempo.current.value && campoFecha.current.value ? setBotonAgregar(true) : setBotonAgregar(false);
    }

    return (
        <div className="card mt-4">
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
                                onChange={validar}
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
                                onChange={validar}
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
                                onChange={validar}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <input
                            type="button"
                            className="btn btn-primary mt-4"
                            value="Agregar"
                            onClick={agregarSesion}
                            disabled={!botonAgregar}
                        />
                        {cargando ? <Spinner /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarSesion;

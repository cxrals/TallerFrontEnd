import React, { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "./Spinner";
import { spinnerCargando } from "../features/spinnerSlice";


const Login = () => {
  const movetrack = 'https://movetrack.develotion.com/'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usuario = useRef(null)
  const password = useRef(null)
  const usuarioCarga = useSelector(state => state.spinner.loading)
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState(null)
  const [botonLogin, setBotonLogin] = useState(false)

  const login = () => {
    dispatch(spinnerCargando(true))
    const bodyData = {
      "usuario": usuario.current.value,
      "password": password.current.value
    };

    fetch(`${movetrack}/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.codigo === 409) {
          setError(true);
          setMensajeError(data.mensaje);
        } else {
          console.log(data);
          localStorage.setItem('apiKey', data.apiKey);
          localStorage.setItem('userId', data.id);
          setError(false);
          setMensajeError(null);
          navigate('/dashboard');
        }
        dispatch(spinnerCargando(false))

      })
      .catch(error => {
        console.error('Error:', error);
        dispatch(spinnerCargando(false))
        setError(true);
        setMensajeError('Error en la conexión');
      });
  }

  const validar = () => {
    usuario.current.value && password.current.value ? setBotonLogin(true) : setBotonLogin(false)
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            required
            ref={usuario}
            onChange={validar}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            required
            ref={password}
            onChange={validar}
          />
        </div>
        <input
          type="button"
          className="btn btn-primary w-100"
          value="Login"
          onClick={login}
          disabled={!botonLogin}
        />
        <Link to="/registro">Registro</Link>
        {error ? <p>{ mensajeError }</p> : null}
        {usuarioCarga ? <Spinner /> : null}
      </div>
    </div>
  )
}

export default Login
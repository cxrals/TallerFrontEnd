import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router";
import { guardarPaises } from "../features/paisesSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Registro = () => {
  const movetrack = 'https://movetrack.develotion.com/'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useRef(null);
  const password = useRef(null);
  const paisSeleccionado = useRef(null);
  const paises = useSelector(state => state.paises.listaPaises);
  const [botonRegistro, setBotonRegistro] = useState(false)

  useEffect(() => {
    fetch(`${movetrack}/paises.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(guardarPaises(data.paises));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const registroUsuario = () => {
    const bodyData = {
      "usuario": usuario.current.value,
      "password": password.current.value,
      "idPais": paisSeleccionado.current.value
    };

    fetch(`${movetrack}/usuarios.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('apiKey', data.apiKey);
        localStorage.setItem('userId', data.id);
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const validar = () => {
    usuario.current.value && password.current.value && paisSeleccionado.current.value ? setBotonRegistro(true) : setBotonRegistro(false)
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Registro</h3>
        <div>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              ref={usuario}
              required
              onChange={validar}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              ref={password}
              required
              onChange={validar}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">País</label>
            <select 
              className="form-select" 
              required 
              ref={paisSeleccionado}
              onChange={validar}
            >
              <option selected>Selecciona un país</option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="button"
            className="btn btn-primary w-100"
            value="Registrarse"
            onClick={registroUsuario}
            disabled={!botonRegistro}
          />
        </div>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Registro;

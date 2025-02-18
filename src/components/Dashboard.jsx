import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import AgregarSesion from './AgregarSesion'
import ListarSesiones from './ListarSesiones'
import Informes from './Informes'
import Graficas from './Graficas'
import { guardarActividades } from '../features/actividadesSlice';
import { guardarSesiones } from '../features/sesionesSlice';


const Dashboard = () => {
    const movetrack = 'https://movetrack.develotion.com'
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${movetrack}/actividades.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'iduser': localStorage.getItem("userId"),
                'apikey': localStorage.getItem("apiKey")
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(guardarActividades(data.actividades));
        })
        .catch(error => {
            console.error('Error:', error);
        });

        fetch(`${movetrack}/registros.php?idUsuario=${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': localStorage.getItem("apiKey"),
                'iduser': localStorage.getItem("userId"),
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(guardarSesiones(data.registros));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
      
    }, [])
    

  return (
    <div className="container">
        <AgregarSesion />
        <ListarSesiones />
        <Informes />
        <Graficas />
    </div>
  )
}

export default Dashboard
function Login() {
    const bodyData = {
        "usuario": "clarroque",
        "password": "test@123"
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
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function Registro() {
    const bodyData = {
        "usuario": "clarroque",
        "password": "test@123",
        "idPais": 235
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
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function ObtenerPaises() {
    fetch(`${movetrack}/paises.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function ObtenerRegistros() {
    fetch(`${movetrack}/registros.php?idUsuario=7`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': ''
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function ObtenerActividades() {
    fetch(`${movetrack}/actividades.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'iduser': 8,
            'apikey': ''
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function AgregarSesion() {
    const bodyData = {
        "idActividad": 8,
        "idUsuario": 7,
        "tiempo": 200,
        "fecha": "2023-09-21"
    };

    fetch(`${movetrack}/registros.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': ''
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function EliminarRegistro() {
    const params = {
        "idRegistro": 3,
    };

    fetch(`${movetrack}/registros.php?` + new URLSearchParams(params), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'iduser': 8,
            'apikey': ''
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
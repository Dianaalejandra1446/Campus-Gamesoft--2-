const d = document;

d.addEventListener("DOMContentLoaded", () => {
    delegarEventos();
})

let listado;
let idDad; 
//LocalStorage con key clientes
const listaAlmacenada = localStorage.getItem('clientes');
let originalID = localStorage.getItem("id");
let idGlobal;

if (originalID == null || !originalID) {
    localStorage.setItem("id", "0");
    idGlobal = "0";
} else {
    idGlobal = originalID;
}

//Si la lista es nula muestreme el listado 
if (listaAlmacenada == null || listaAlmacenada === undefined) {
    listado = [] //Revisar bien que sea las mismas variables
} else {
    // Parsear el valor almacenado como un array
    listado = JSON.parse(listaAlmacenada);
}
if (listado) {
    //Por cada listado me agregue los siguientes elementos
    const agregarDiv = d.getElementById('clientesNuevo');
    agregarDiv.innerHTML = '';
    for (let i = 0; i < listado.length; i++) {
        const cliente = listado[i];
        let intoID = listado[i].id;
        agregarDiv.innerHTML += `<div class="contendor-cliente" data-set=${intoID}>
        <tr>
        <td><img src="./IMAGES/foto.png" alt="cliente"></td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.identificacion}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.correo}</td>
        <td>${cliente.fechaNac}</td>
        <td>${cliente.nacionalidad}</td>
        <td><button  type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#update" data-bs-whatever="@getbootstrap" id="editar">Editar</button></td>
        <td><button onclick="eliminarCliente(${i})" id= "styleEliminar">Eliminar</button><td>
        </tr>
        </div>`
    }
}

function agregarCliente() {
    let currentID = parseInt(localStorage.getItem("id"));
    if (isNaN(currentID)) {
        currentID = 0;
    }

    let id = currentID + 1;

    let nombre = d.getElementById("nombreF");
    let apellido = d.getElementById('apellido')
    let identificacion = d.getElementById('identificacion');
    let telefono = d.getElementById('telefono');
    let correo = d.getElementById('correo');
    let fechaNac = d.getElementById('fechaNac');
    let nacionalidad = d.getElementById('nacionalidad');

    let cliente = {
        id,
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value,
        telefono: telefono.value,
        correo: correo.value,
        fechaNac: fechaNac.value,
        nacionalidad: nacionalidad.value
    }
    listado.push(cliente);
    //Enviar el listado a localstorage 
    localStorage.setItem('clientes', JSON.stringify(listado));
    localStorage.setItem("id", `${id}`);
    mostrarClientes();

    // Limpiar los campos del formulario
    d.getElementById('nombreF').value = '';
    d.getElementById('apellido').value = '';
    d.getElementById('identificacion').value = '';
    d.getElementById('telefono').value = '';
    d.getElementById('correo').value = '';
    d.getElementById('fechaNac').value = '';
    d.getElementById('nacionalidad').value = '';
    delegarEventos();
}

function mostrarClientes() {
    const agregarDiv = d.getElementById('clientesNuevo');
    agregarDiv.innerHTML = '';
    for (let i = 0; i < listado.length; i++) {
        const cliente = listado[i];
        let id = listado[i].id
        agregarDiv.innerHTML += `<div id="contendor-cliente" data-set=${id}>
    <tr>
    <td><img src="./IMAGES/foto.png" alt="cliente"></td>
    <td>${cliente.nombre}</td>
    <td>${cliente.apellido}</td>
    <td>${cliente.identificacion}</td>
    <td>${cliente.telefono}</td>
    <td>${cliente.correo}</td>
    <td>${cliente.fechaNac}</td>
    <td>${cliente.nacionalidad}</td>
    <td><button  type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#update" data-bs-whatever="@getbootstrap" id="editar">Editar</button></td>
    <td><button onclick="eliminarCliente(${i})" id ='styleEliminar'>Eliminar</button></td>
    <tr>
    </div>`
    }
}

function delegarEventos() {
    const buttonsUpdate = d.querySelectorAll('#editar');
    buttonsUpdate.forEach(button => {
        button.addEventListener('click', (e) => contenido(e))
    })

    const buttonUpdateInto = d.querySelectorAll("#updateContent");
    buttonUpdateInto.forEach(button => {
        button.addEventListener('click', modificar)
    })
}

function eliminarCliente(index) {
    if (confirm("¿Estas seguro de eliminar un cliente?")) {
        listado.splice(index, 1);//Elimina el elemento en la posicion 'index' del arreglo listado
        let currentID = parseInt(localStorage.getItem("id"));
        if (!isNaN(currentID) && currentID > 0) {
            currentID--;
            localStorage.setItem("id", currentID.toString());
        }
        localStorage.setItem('clientes', JSON.stringify(listado));
        mostrarClientes();

    }
}
function buscar() {
    //Llamamos al input buscar
    let buscarClien = d.getElementById("buscador").value;

    //Validacion por si esta vacio
    if (buscarClien.trim() === "") {
        return;
    }
    //Creamos un array vacio para el resultado
    let result = [];
    //Que me recorra la lista principal convirtiendola en minuscula 
    for (let i = 0; i < listado.length; i++) {
        //Buscar por el nombre
        if (listado[i].nombre.toLowerCase().includes(buscarClien.toLowerCase())) {
            result.push(listado[i]);
        }
        //Buscar por el apellido
        else if (listado[i].apellido.toLowerCase().includes(buscarClien.toLowerCase())) {
            result.push(listado[i]);
        }
        //Buscar por la identificacion
        else if (listado[i].identificacion.includes(buscarClien)) {
            result.push(listado[i]);
        }
        //Buscar por el telefono
        else if (listado[i].telefono.includes(buscarClien)) {
            result.push(listado[i]);
        }
        //Buscar por el correo
        else if (listado[i].correo.toLowerCase().includes(buscarClien.toLowerCase())) {
            result.push(listado[i]);
        }
        //Buscar por la fecha
        else if (listado[i].fechaNac.includes(buscarClien)) {
            result.push(listado[i]);
        }
        //Buscar por la nacionalidad 
        else if (listado[i].nacionalidad.toLowerCase().includes(buscarClien.toLowerCase())) {
            result.push(listado[i]);
        }
    }
    const clientesNuevo = d.getElementById("clientesNuevo");
    clientesNuevo.innerHTML = '';

    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            const cliente = result[i];
            const tr = d.createElement('tr');
            tr.innerHTML = `
            <tr>
                <td><img src="./IMAGES/foto.png" alt="cliente"></td>
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.identificacion}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.fechaNac}</td>
                <td>${cliente.nacionalidad}</td>
                <td><button" id ="editar">Editar</button></td>
                <td><button id ="styleEliminar">Eliminar</button></td>
            </tr>`;
            clientesNuevo.appendChild(tr);
        }
    }
}
function contenido(e) {
    let objs = ["nombre", "apellido", "identificacion", "telefono", "correo", "fechaNac", "nacionalidad"]
    let Dad = e.target.parentNode;
    idDad = Dad.dataset.set;
    let clients = JSON.parse(localStorage.getItem("clientes"));
    let client = clients.filter(client => client.id == idDad);
    for(let x = 0; x < 7; x++) {
        let element = d.querySelector(`[name="${objs[x]}"]`);
        let updateValue = client[0][objs[x]]
        element.value = updateValue
    }
}

function modificar() {
    let objs = ["nombre", "apellido", "identificacion", "telefono", "correo", "fechaNac", "nacionalidad"]
    let obj = {}
    for(let x = 0; x < 7; x++) {
        let element = d.querySelector(`[name="${objs[x]}"]`).value;
        obj[objs[x]] = element
    }   
    let clients = JSON.parse(localStorage.getItem("clientes"));
    let change = []
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id == idDad) {
            console.log(true)
            for (let prop in obj) {
                clients[i][prop] = obj[prop];
                change = clients
            }
        }
    }
    localStorage.setItem("clientes", JSON.stringify(change));
    mostrarClientes()

}

const button = d.getElementById('button');
button.addEventListener('click', agregarCliente);

const buttonBuscar = d.getElementById('buscar');
buttonBuscar.addEventListener('click', buscar);

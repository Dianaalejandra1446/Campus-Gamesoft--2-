const d = document;

//Lista de videojuegos
let games;

//Local storage con key juegos
const Almacenar = localStorage.getItem('juegos');
//Local storage para el id 
let saveID = localStorage.getItem("id");
/*idGlobal (que se inicializa con el valor de saveID o se establece en "0" si no existe en el almacenamiento local. */
let idGlobal;



if (saveID == null || !saveID) {
    localStorage.setItem("id", "0");
    idGlobal = "0";
} else {
    idGlobal = saveID;
}

//Si la lista es nula muestreme el listado 
if (Almacenar == null || Almacenar === undefined) {
    games = []; //Revisar bien que sea las mismas variables
} else {
    // Parsear el valor volviendolo objeto js
    games = JSON.parse(Almacenar);
}
if(games){
    const container = d.getElementById('containerCards');
    container.innerHTML = ""
    for (let i = 0; i < games.length; i++) {
        const newGame = games[i];
        let id = games[i].id
        container.innerHTML += `<div class="card-character" data-juego-id = ${id}>
        <img class="img" src="${newGame.imagen}" alt="maquetacion-images">
        <div class="description-card">
            <h2>${newGame.nombre}</h2>
            <p>${newGame.tematica}</p>
            <p>${newGame.licencia}</p>
            <p>${newGame.puntos}</p>
            <button type="button" onclick="eliminarGame(${i})" id ="Eliminar">Eliminar</button>
        </div>`
    }
}

function agregarGame(){
    //Obtenemos el numero del valor del ID
    let ObtenerID = parseInt(localStorage.getItem("id"))

    // Verificar si el ID es un número válido
       if (isNaN(ObtenerID)) {
        ObtenerID = 0;
    }
    //Generar un ID incrementando +1
    let id = ObtenerID +1
    
    let Inputnombre = d.getElementById('nombre');
    let Inputimagen = d.getElementById('imagen');
    let SelectTematica = d.getElementById('tematica');
    let Inputlicencia = d.getElementById('licencia');
    let InputPuntos = d.getElementById('puntos');
    
    let tematicaValue = SelectTematica.value;
    let contenidoTematica;
    
    switch (tematicaValue) {
        case '0':
            contenidoTematica = 'Aventura';
            break;
        case '1':
            contenidoTematica = 'Ciencia Ficción';
            break;
        case '2':
            contenidoTematica = 'Fantasía';
            break;
        case '3':
            contenidoTematica = 'Terror';
            break;
        default:
            contenidoTematica = 'Tema Desconocido';
    }
    let nuevoJuego = {
        id,//Id del juego
        nombre: Inputnombre.value,
        imagen: Inputimagen.value,
        tematica: contenidoTematica,
        licencia: Inputlicencia.value,
        puntos: InputPuntos.value
    }
    games.push(nuevoJuego);
    //Enviar el listado al localstorage
    localStorage.setItem('juegos', JSON.stringify(games));

    // Almacenar el nuevo ID en el almacenamiento local
    localStorage.setItem("id", `${id}`);
    mostrarJuegos();
    //Limpiamos los campos del formulario
    d.getElementById('nombre').value = '';
    d.getElementById('imagen').value = '';
    d.getElementById('licencia').value = '';
    d.getElementById('puntos').value = '';
}

function mostrarJuegos(){
    const container = d.getElementById('containerCards');
    container.innerHTML = ""
    for (let i = 0; i < games.length; i++) {
        const newGame = games[i];
        let id = games[i].id
        container.innerHTML += `<div class="card-character" data-juego-id = ${id}>
        <img class="img" src="${newGame.imagen}" alt="maquetacion-images">
        <div class="description-card">
            <h2>${newGame.nombre}</h2>
            <p>${newGame.tematica}</p>
            <p>${newGame.licencia}</p>
            <p>${newGame.puntos}</p>
            <button type="button" onclick="eliminarGame(${i})" id ='Eliminar'>Eliminar</button>
        </div>`

    }
}

function eliminarGame(index){
        if (confirm("¿Estas seguro de eliminar el juego?")) {
        games.splice(index, 1);//Elimina el elemento en la posicion 'index' del arreglo listado
        let ObtenerID = parseInt(localStorage.getItem("id"));
        if (!isNaN(ObtenerID) && ObtenerID > 0) {
            ObtenerID--;//Para que se decremente 1
            localStorage.setItem("id", ObtenerID.toString());
        }
        localStorage.setItem('juegos', JSON.stringify(games));
        mostrarJuegos();
    
    } 
}
const buttonAgregar = d.getElementById('agregar');
buttonAgregar.addEventListener('click',agregarGame);

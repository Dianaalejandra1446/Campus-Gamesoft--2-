document.addEventListener("DOMContentLoaded", function () {
    const d = document;
    
    //LocalStorage
    let compras;
    const GuardarCompra = localStorage.getItem("compra");

    //Si la lista es nula muestreme el listado 
    if (GuardarCompra == null || GuardarCompra === undefined) {
        compras = [] // Revisar bien que sean las mismas variables
    } else {
        // Parsear el valor almacenado como un array
        compras = JSON.parse(GuardarCompra);
    }

    const listaClientes = JSON.parse(localStorage.getItem('clientes'));
    const listaJuegos = JSON.parse(localStorage.getItem('juegos'));

    // Restaurar el contenido de contenedorCliente desde localStorage si existe
    const contenedorCliente = d.getElementById('info-client');
    const clienteResumen = JSON.parse(localStorage.getItem('clienteResumen'));
    if (clienteResumen) {
        contenedorCliente.innerHTML = clienteResumen;
    }

    // Restaurar el contenido de contenedorCompra desde localStorage si existe
    const contenedorCompra = d.getElementById('sumatoria');
    const compraResumen = JSON.parse(localStorage.getItem('compraResumen'));
    if (compraResumen) {
        contenedorCompra.innerHTML = compraResumen;
    }

    if (listaClientes) {
        const containerCliente = d.getElementById('client-container');
        containerCliente.innerHTML = ''; // Limpia el contenido existente

        for (let i = 0; i < listaClientes.length; i++) {
            const cliente = listaClientes[i];

            containerCliente.innerHTML += `
                <h2>Cliente</h2>
                <p>ID cliente: ${i + 1}</p>
                <h3>Nombre: ${cliente.nombre}</h3>
                <p>Apellido: ${cliente.apellido}</p>
                <p>Identificación: ${cliente.identificacion}</p>
                <p>Teléfono: ${cliente.telefono}</p>
                <p>Correo: ${cliente.correo}</p>
                <p>Fecha Nac: ${cliente.fechaNac}</p>
                <p>Nacionalidad: ${cliente.nacionalidad}</p>
                ------------------------------
                <button class="select-client" data-client-id="${i}">Seleccionar</button>
            `;
        }
    }

    if (listaJuegos) {
        const containerJuegos = d.getElementById('game-container');
        containerJuegos.innerHTML = '';

        for (let index = 0; index < listaJuegos.length; index++) {
            const juego = listaJuegos[index];

            containerJuegos.innerHTML += `
                <h2>Juego</h2>
                <p>ID juego: ${index + 1}</p>
                <h3>Nombre: ${juego.nombre}</h3>
                <p>Tematica: ${juego.tematica}</p>
                <p>Licencia: ${juego.licencia}</p>
                <p>Puntos: ${juego.puntos}</p>
                <img class="img" src="${juego.imagen}" alt="maquetacion-images">
                ------------------------------
                <button class="select-game" data-game-id="${index}">Seleccionar Juego</button>
            `;
        }

        const ivaRate = 0.16; // 16% de IVA
        const impuestoEspecialRate = 0.04; // 4% de impuesto especial

        d.addEventListener('click', function (event) {
            if (event.target.classList.contains('select-client')) {
                const clienteIndex = parseInt(event.target.getAttribute('data-client-id'));
                const cliente = listaClientes[clienteIndex];

                // Guardar el cliente seleccionado en el array de compras
                compras.push({
                    tipo: 'cliente',
                    id: clienteIndex,
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                })

                localStorage.setItem('compra', JSON.stringify(compras));

                // Muestra el resumen del cliente en el contenedorCliente
                const resumenCliente = `
                    <h2>Resumen del Cliente</h2>
                    ID del cliente: ${clienteIndex + 1}
                    Nombre: ${cliente.nombre},
                    Apellido: ${cliente.apellido},
                    Identificacion: ${cliente.identificacion}
                    Telefono: ${cliente.telefono}
                    Correo: ${cliente.correo}
                    FechaNac: ${cliente.fechaNac}
                    Nacionalidad: ${cliente.nacionalidad}
                `;
                contenedorCliente.innerHTML = resumenCliente;

                // Almacena el resumen del cliente en localStorage
                localStorage.setItem('clienteResumen', JSON.stringify(resumenCliente));

                // Muestra una alerta con el cliente seleccionado
                alert(`Cliente seleccionado: ${cliente.nombre} ${cliente.apellido}`);
            } else if (event.target.classList.contains('select-game')) {
                const juegoIndex = parseInt(event.target.getAttribute('data-game-id'));
                const juego = listaJuegos[juegoIndex];

                // Guarda el juego seleccionado en el array de compras
                compras.push({
                    tipo: 'Juego',
                    id: juegoIndex,
                    nombre: juego.nombre,
                    valorAntesDelIVA: parseFloat(juego.licencia),
                })
                localStorage.setItem('compra', JSON.stringify(compras));

                // Calcula el valor antes del IVA
                const valorAntesDelIVA = parseFloat(juego.licencia);

                // Calcula el valor del IVA
                const valorIVA = valorAntesDelIVA * ivaRate;

                // Calcula el impuesto especial
                const valorImpuestoEspecial = valorAntesDelIVA * impuestoEspecialRate;

                // Calcula el valor total (valor antes del IVA + valor del IVA + valor del impuesto especial)
                const valorTotal = valorAntesDelIVA + valorIVA + valorImpuestoEspecial;

                // Muestra el resumen del juego en el contenedorCompra
                const resumenCompra = `
                    <h2>Resumen de la Compra</h2>
                    ID del juego: ${juegoIndex + 1}
                    Nombre: ${juego.nombre}
                    Valor antes del IVA: ${valorAntesDelIVA.toFixed(2)} USD
                    Valor del IVA (${ivaRate * 100}%): ${valorIVA.toFixed(2)} USD
                    Valor del Impuesto Especial (${impuestoEspecialRate * 100}%): ${valorImpuestoEspecial.toFixed(2)} USD
                    Valor Total: ${valorTotal.toFixed(2)} USD
                `;
                contenedorCompra.innerHTML = resumenCompra;

                // Almacena el resumen de la compra en localStorage
                localStorage.setItem('compraResumen', JSON.stringify(resumenCompra));

                // Muestra una alerta con el juego seleccionado
                alert(`Juego seleccionado: ${juego.nombre}`);
            }
        });
    }
});

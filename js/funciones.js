//const url = 'https://api-2670689.onrender.com/usuario'
const url = 'http://localhost:8989/devolucion'

const listarDevoluciones = async() => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById ('contenido') 
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((res) => res.json())//Obtener respuesta de la petición
    .then(function(data){//Se manipulan los datos obtenidos de la url
        let listaDevolucion = data.msg //msg es el nombre de la lista retorna con json
        console.log(listaDevolucion)
        listaDevolucion.map(function (devolucion) {
            //Configurar el objeto para enviarlo por url
            objetoDevolucion = Object.keys(devolucion).map(key => key + '=' + 
            encodeURIComponent(devolucion[key])).join('&');
            console.log(devolucion)
            contenido = contenido + `<tr>`+
            `<td>`+devolucion.nombreCliente+`</td>`+
            `<td>`+devolucion.venta+`</td>`+
            `<td>`+devolucion.cantidad+`</td>`+
            `<td>`+devolucion.producto+`</td>`+
            `<td>`+devolucion.motivo+`</td>`+
            `<td>`+devolucion.estado+`</td>`+
            `<td><button onclick="redireccionarEditar('${objetoDevolucion}')">Editar</button>
            <button onclick="eliminarVenta('${devolucion.nombreCliente}')">Eliminar</button></td>`+
            `</tr>`
        })
        objectId.innerHTML = contenido
    })

    /*for(i = 1; i<10; i++){
        contenido = contenido + '<tr>'+
        '<td>nombre</td>'+
        '<td>rol</td>'+
        '<td>estado</td>'
    }
    */

}

const registrarDevolucion= () => {
    const nombreCliente = document.getElementById('nombreCliente').value;
    const venta = document.getElementById('venta').value
    const cantidad = document.getElementById('cantidad').value
    const producto = document.getElementById('producto').value
    const motivo = document.getElementById('motivo').value
    const estado = document.getElementById('estado').value

    if(nombreCliente.length == 0){
        document.getElementById('nombreClienteHelp').innerHTML = 'Dato requerido'

    }
    else if(venta.length == 0){
        document.getElementById('documentoHelp').innerHTML = 'Dato requerido'
    }  
    else if(cantidad.length == 0){
        document.getElementById('correoHelp').innerHTML = 'Dato requerido'
    }  
    
    else if(producto == ""){
        document.getElementById('productoHelp').innerHTML = 'Dato requerido'
    }

    else if(motivo == ""){
        document.getElementById('motivoHelp').innerHTML = 'Dato requerido'
    }

    else if(estado == ""){
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }

    else{
        let devolucion = {
            nombreCliente: nombreCliente,
            venta: venta,
            cantidad: cantidad,
            producto: producto,
            motivo:motivo,
            estado: estado
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(devolucion),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(json.msg) //Imprimir el mensaje de la transacción
        })

        }
}

const actualizarDevolucion= () => {
    // const id = obtenerIdDesdeURL(); // Asegúrate de tener una función para obtener el ID de la URL
    const nombreCliente = document.getElementById('nombreCliente').value;
    const venta = document.getElementById('venta').value
    const cantidad = document.getElementById('cantidad').value
    const producto = document.getElementById('producto').value
    const motivo = document.getElementById('motivo').value
    const estado = document.getElementById('estado').value

    if(nombreCliente.length == 0){
        document.getElementById('nombreClienteHelp').innerHTML = 'Dato requerido'

    }
    else if(venta.length == 0){
        document.getElementById('ventadHelp').innerHTML = 'Dato requerido'
    }  
    else if(cantidad.length == 0){
        document.getElementById('cantidadHelp').innerHTML = 'Dato requerido'
    }  
    
    else if(producto == ""){
        document.getElementById('productoHelp').innerHTML = 'Dato requerido'
    }

    else if(motivo == ""){
        document.getElementById('motivoHelp').innerHTML = 'Dato requerido'
    }

    else if(estado == ""){
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else{
        let devolucion = {
            nombreCliente: nombreCliente,
            venta: venta,
            cantidad: cantidad,
            producto: producto,
            motivo:motivo,
            estado: estado
        }
        
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(devolucion),//Convertir el objeto a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(json => {
            alert(json.msg) //Imprimir el mensaje de la transacción
            
        })
        }
}

const redireccionarEditar = (objetoDevolucion) => {
    document.location.href='editarDevolucion.html?devolucion='+objetoDevolucion
}

const editarDevolucion = () => {
    // Obtener datos de la url
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('nombreCliente').value = urlParams.get('nombreCliente')
    document.getElementById('venta').value = urlParams.get('venta')
    document.getElementById('cantidad').value = urlParams.get('cantidad')
    document.getElementById('producto').value = urlParams.get('producto')
    document.getElementById('motivo').value = urlParams.get('motivo')
    document.getElementById('estado').value = urlParams.get('estado')
}

const eliminarVenta = async (nombreCliente) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ nombreCliente })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "success",
            title: (json.msg),
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            listarDevoluciones();
        }, 1000);

    } catch (error) {
        console.error('Error al eliminar la venta:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('Eliminacion Exitosa');
    }

};
function confirmarEliminar(nombreCliente) {
    Swal.fire({
        title: "¿Estás seguro de que deseas eliminar esta Venta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarVenta(nombreCliente);
        }
    });
}

if(document.querySelector('#btnRegistrar')){ //Si objeto exitste
document.querySelector('#btnRegistrar')
.addEventListener('click', registrarDevolucion)
}

if(document.querySelector('#btnActualizar')){//Si objeto existe
document.querySelector('#btnActualizar')
.addEventListener('click', actualizarDevolucion)
}
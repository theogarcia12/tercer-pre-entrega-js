function mostrarModal() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById('modal').style.display = 'block';
}

function cerrarModal() {
document.getElementById("overlay").style.display = "none";
document.getElementById('modal').style.display = 'none';
}

function crearLista() {
// Obtener los valores del formulario
var nombreLista = document.getElementById('nombreLista').value;
var fechaCreacion = document.getElementById('fechaCreacion').value;

// Crear la URL con los parámetros
window.location.href = 'html/lista.html?nombre=' + encodeURIComponent(nombreLista) + '&fecha=' + encodeURIComponent(fechaCreacion);

// Redirigir a la página de la lista con los parámetros
window.location.href = url;
}
// Aquí puedes hacer lo que necesites con el nombre y la fecha de la lista
console.log('Nombre de la Lista:', nombreLista);
console.log('Fecha de Creación:', fechaCreacion);

// Cerrar el modal después de hacer algo con la información
cerrarModal();
function mostrarModal() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById('modal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById('modal').style.display = 'none';
}

function crearLista() {
    var nombreLista = document.getElementById('nombreLista').value;
    var fechaCreacion = document.getElementById('fechaCreacion').value;

    if (!nombreLista) {
        Toastify({
            text: "Por favor ingrese un nombre",
            duration: 2000,
            style: {
            background: "red",
            }
        }).showToast();
        return;
    }


    if (!fechaCreacion) {
        Toastify({
            text: "Por favor ingrese una fecha",
            duration: 2000,
            style: {
            background: "red",
            }
        }).showToast();
        return;
    }

    var url = 'html/lista.html?nombre=' + encodeURIComponent(nombreLista) + '&fecha=' + encodeURIComponent(fechaCreacion);

    window.location.href = url;

    cerrarModal();
}

var crearTareaBtn = document.getElementById('crearTareaBtn');

crearTareaBtn.addEventListener('click', mostrarModal);

var crearListaBtn = document.getElementById('crearListaBtn');

crearListaBtn.addEventListener('click', crearLista);
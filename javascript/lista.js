// Variables
let listaDeTareas = obtenerListaDeTareas() || [];

// Funciones
function obtenerListaDeTareas() {
  const listaGuardada = localStorage.getItem('tareas');
  return listaGuardada ? JSON.parse(listaGuardada) : null;
}

function guardarListaDeTareas() {
  localStorage.setItem('tareas', JSON.stringify(listaDeTareas));
}

function agregarTarea(nombre) {
  const nuevaTarea = {
    nombre: nombre,
    completada: false
  };
  listaDeTareas.push(nuevaTarea);
  guardarListaDeTareas();
}
function eliminarTodasPendientes() {
  listaDeTareas = listaDeTareas.filter(tarea => tarea.completada);
  guardarListaDeTareas();
  actualizarInterfaz();
}

function eliminarTodas() {
  listaDeTareas = [];
  guardarListaDeTareas();
  actualizarInterfaz();
}
function toggleEditarOptions() {
  const editarOptions = document.getElementById("editarOptions");
  editarOptions.classList.toggle("mostrar"); // Agregamos o quitamos la clase "mostrar"
}

function crearBotonTarea(index) {
  const tareaElemento = document.createElement("div");
  tareaElemento.textContent = `${listaDeTareas[index].nombre} - ${listaDeTareas[index].completada ? '✔️' : '❌'}`;
  tareaElemento.classList.add('tareaItem');

  tareaElemento.addEventListener("mouseenter", function() {
    const cruz = document.createElement("span");
    cruz.textContent = "×";
    cruz.className = "eliminarIcono";
    cruz.addEventListener("click", function(event) {
      event.stopPropagation();
      eliminarTarea(index);
      Toastify({
        text: "Eliminado Correctamente!",
        duration: 2000,
        style: {
          background: "red",
        }
      }).showToast();
      actualizarInterfaz();
    });

    tareaElemento.appendChild(cruz);
  });

  tareaElemento.addEventListener("mouseleave", function() {
    const cruz = tareaElemento.querySelector(".eliminarIcono");
    if (cruz) {
      tareaElemento.removeChild(cruz);
    }
  });

  tareaElemento.addEventListener("click", function() {
    toggleCompletada(index);
    actualizarInterfaz();
  });

  return tareaElemento;
}

function actualizarInterfaz() {
  const tareasContainer = document.getElementById("tareasContainer");
  tareasContainer.innerHTML = "";

  listaDeTareas.forEach((tarea, index) => {
    const tareaElemento = crearBotonTarea(index);
    tareasContainer.appendChild(tareaElemento);
  });

  // Mostrar información del dólar
  const dolarInfoContainer = document.getElementById("dolarInfo");
  fetch("https://dolarapi.com/v1/dolares/blue")
    .then(response => response.json())
    .then(data => {
      const dolarInfo = `Dólar Blue: Compra ${data.compra} / Venta ${data.venta}`;
      dolarInfoContainer.textContent = dolarInfo;
    });
}

function agregarNuevaTarea() {
  const inputTarea = document.getElementById("nuevaTarea");
  const nuevaTareaNombre = inputTarea.value.trim();
  Toastify({
    text: "Agregado Correctamente!",
    duration: 2000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();

  if (nuevaTareaNombre !== "") {
    agregarTarea(nuevaTareaNombre);
    actualizarInterfaz();
    inputTarea.value = "";
  }
}

function toggleCompletada(index) {
  if (index >= 0 && index < listaDeTareas.length) {
    listaDeTareas[index].completada = !listaDeTareas[index].completada;
    guardarListaDeTareas();
  }
}

function eliminarTarea(index) {
  if (index >= 0 && index < listaDeTareas.length) {
    listaDeTareas.splice(index, 1);
    guardarListaDeTareas();
  }
}
function guardarNombreLista(event) {
  event.preventDefault();
  const nombreLista = document.getElementById("nombreLista").value;
  localStorage.setItem("nombreLista", nombreLista);
  mostrarListaConNombreGuardado();
  ocultarCrearListaPopup();
}

function mostrarListaConNombreGuardado() {
  const nombreLista = localStorage.getItem("nombreLista");
  if (nombreLista) {
    alert(`Mostrar lista con nombre: ${nombreLista}`);
    // Aquí puedes realizar las acciones necesarias para mostrar la lista con el nombre proporcionado
    // Puedes utilizar tu lógica existente y actualizarInterfaz con el nombre de la lista, etc.
  }
}

function mostrarFormularioCrearLista() {
  const crearListaPopup = document.getElementById("crearListaPopup");
  crearListaPopup.style.display = "block";
}

function ocultarCrearListaPopup() {
  const crearListaPopup = document.getElementById("crearListaPopup");
  crearListaPopup.style.display = "none";
}
document.addEventListener('DOMContentLoaded', function () {
  // Obtener los parámetros de la URL
  var params = new URLSearchParams(window.location.search);
  var nombreLista = params.get('nombre');
  var fechaCreacion = params.get('fecha');

  // Utilizar la información para mostrarla en tu página
  var informacionLista = document.getElementById('informacionLista');

  // Crear un nuevo elemento div
  var divInformacion = document.createElement('div');

  // Agregar la información al nuevo div
  divInformacion.innerHTML = '<strong>Nombre de la Lista:</strong> ' + nombreLista + '<br>' +
                             '<strong>Fecha de Creación:</strong> ' + fechaCreacion;

  // Agregar el nuevo div al principio de la lista
  informacionLista.insertBefore(divInformacion, informacionLista.firstChild);
});
actualizarInterfaz();

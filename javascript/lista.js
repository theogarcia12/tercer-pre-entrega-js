let listaDeTareas = obtenerListaDeTareas() || [];

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
  listaDeTareas = listaDeTareas.filter(tarea => !tarea.completada);
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
  editarOptions.classList.toggle("mostrar");
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


function mostrarFormularioCrearLista() {
  const crearListaPopup = document.getElementById("crearListaPopup");
  crearListaPopup.style.display = "block";
}

function ocultarCrearListaPopup() {
  const crearListaPopup = document.getElementById("crearListaPopup");
  crearListaPopup.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var nombreLista = params.get('nombre');
  var fechaCreacion = params.get('fecha');
  var informacionLista = document.getElementById('informacionLista');
  var divInformacion = document.createElement('div');

  divInformacion.innerHTML = '<strong>Nombre de la Lista:</strong> ' + nombreLista + '<br>' +
                             '<strong>Fecha de Creación:</strong> ' + fechaCreacion;

  informacionLista.insertBefore(divInformacion, informacionLista.firstChild);
});

var editarBtn = document.getElementById('editarBtn');
var eliminarPendientesBtn = document.getElementById('eliminarPendientesBtn');
var eliminarTodoBtn = document.getElementById('eliminarTodoBtn');
var agregarBtn = document.getElementById('agregarBtn');

editarBtn.addEventListener('click', toggleEditarOptions);
eliminarPendientesBtn.addEventListener('click', eliminarTodasPendientes);
eliminarTodoBtn.addEventListener('click', eliminarTodas);
agregarBtn.addEventListener('click', agregarNuevaTarea);

actualizarInterfaz();
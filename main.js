// Variables
let listaDeTareas = obtenerListaDeTareas() || []; // Intentamos cargar desde localStorage

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
  guardarListaDeTareas(); // Guardamos en localStorage
}

function crearBotonTarea(index) {
  const tareaElemento = document.createElement("div");
  tareaElemento.textContent = `${listaDeTareas[index].nombre} - ${listaDeTareas[index].completada ? 'Completada' : 'Pendiente'}`;
  tareaElemento.classList.add('tareaItem');
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
}

function agregarNuevaTarea() {
  const inputTarea = document.getElementById("nuevaTarea");
  const nuevaTareaNombre = inputTarea.value.trim();

  if (nuevaTareaNombre !== "") {
    agregarTarea(nuevaTareaNombre);
    actualizarInterfaz();
    inputTarea.value = "";
  }
}

function toggleCompletada(index) {
  if (index >= 0 && index < listaDeTareas.length) {
    listaDeTareas[index].completada = !listaDeTareas[index].completada;
    guardarListaDeTareas(); // Guardamos en localStorage
  }
}

actualizarInterfaz();s
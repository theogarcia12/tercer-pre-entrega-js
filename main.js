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

function crearBotonTarea(index) {
  const tareaElemento = document.createElement("div");
  tareaElemento.textContent = `${listaDeTareas[index].nombre} - ${listaDeTareas[index].completada ? 'Comprado' : 'No comprado'}`;
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

actualizarInterfaz();

const contenedor = document.getElementById("cronometros");
const emptyState = document.getElementById("emptyState");

const botonNuevo = document.getElementById("nuevoCronometro");
const crearPrimero = document.getElementById("crearPrimero");

const modal = document.getElementById("modal");
const inputNombre = document.getElementById("nombreCronometro");

const guardar = document.getElementById("guardar");
const cancelar = document.getElementById("cancelar");

const modalTitulo = document.getElementById("modalTitulo");

let cronometros =
    JSON.parse(localStorage.getItem("cronometros")) || [];

let editandoId = null;


/* -----------------------
   GUARDAR
----------------------- */

function guardarDatos() {

    localStorage.setItem(
        "cronometros",
        JSON.stringify(cronometros)
    );

}


/* -----------------------
   CREAR CRONÓMETRO
----------------------- */

function crearCronometro(nombre) {

    const cronometro = {

        id: Date.now(),

        nombre: nombre,

        tiempoAcumulado: 0,

        inicio: null,

        activo: false
    };

    cronometros.push(cronometro);

    guardarDatos();
    renderizar();
}


/* -----------------------
   INICIAR
----------------------- */

function iniciar(id) {

    const timer = cronometros.find(
        timer => timer.id === id
    );

    if (!timer || timer.activo)
        return;

    timer.activo = true;

    timer.inicio = Date.now();

    guardarDatos();
    renderizar();
}


/* -----------------------
   PAUSAR
----------------------- */

function pausar(id) {

    const timer = cronometros.find(
        timer => timer.id === id
    );

    if (!timer || !timer.activo)
        return;

    const ahora = Date.now();

    timer.tiempoAcumulado +=
        ahora - timer.inicio;

    timer.activo = false;

    timer.inicio = null;

    guardarDatos();
    renderizar();
}


/* -----------------------
   REINICIAR
----------------------- */

function reiniciar(id) {

    const timer = cronometros.find(
        timer => timer.id === id
    );

    if (!timer)
        return;

    timer.tiempoAcumulado = 0;

    if (timer.activo) {
        timer.inicio = Date.now();
    }

    guardarDatos();
    renderizar();
}


/* -----------------------
   ELIMINAR
----------------------- */

function eliminar(id) {

    const timer = cronometros.find(
        timer => timer.id === id
    );

    if (!timer)
        return;

    const confirmar = window.confirm(
        `¿Eliminar "${timer.nombre}"?`
    );

    if (!confirmar)
        return;

    cronometros =
        cronometros.filter(
            timer => timer.id !== id
        );

    guardarDatos();
    renderizar();
}


/* -----------------------
   EDITAR
----------------------- */

function editar(id) {

    const timer = cronometros.find(
        timer => timer.id === id
    );

    if (!timer)
        return;

    editandoId = id;

    inputNombre.value = timer.nombre;

    modalTitulo.textContent =
        "Editar cronómetro";

    abrirModal();

    inputNombre.focus();
}


/* -----------------------
   TIEMPO ACTUAL
----------------------- */

function obtenerTiempo(timer) {

    let tiempo =
        timer.tiempoAcumulado;

    if (timer.activo) {

        tiempo +=
            Date.now() - timer.inicio;
    }

    return tiempo;
}


/* -----------------------
   FORMATEAR TIEMPO
----------------------- */

function formatearTiempo(ms) {

    const segundosTotales =
        Math.floor(ms / 1000);

    const horas =
        Math.floor(segundosTotales / 3600);

    const minutos =
        Math.floor(
            (segundosTotales % 3600) / 60
        );

    const segundos =
        segundosTotales % 60;

    return [
        horas,
        minutos,
        segundos
    ]
    .map(numero =>
        String(numero).padStart(2, "0")
    )
    .join(":");
}


/* -----------------------
   MOSTRAR CRONÓMETROS
----------------------- */

function renderizar() {

    contenedor.innerHTML = "";

    if (cronometros.length === 0) {

        emptyState.style.display = "block";

        return;

    }

    emptyState.style.display = "none";

    cronometros.forEach(timer => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className =
            "timer-card";

        tarjeta.innerHTML = `

            <div class="timer-info">

                <h2>
                    ${escaparHTML(timer.nombre)}
                </h2>

                <p class="estado ${timer.activo ? "activo" : ""}">

                    ${
                        timer.activo
                        ? "● En ejecución"
                        : "Pausado"
                    }

                </p>

            </div>


            <div
                class="timer-time"
                data-timer="${timer.id}"
            >

                ${formatearTiempo(
                    obtenerTiempo(timer)
                )}

            </div>


            <div class="timer-actions">

                ${
                    timer.activo

                    ? `
                    <button
                        class="btn-pause"
                        onclick="pausar(${timer.id})"
                    >
                        Pausar
                    </button>
                    `

                    : `
                    <button
                        class="btn-start"
                        onclick="iniciar(${timer.id})"
                    >
                        Iniciar
                    </button>
                    `
                }

                <button
                    class="btn-secondary"
                    onclick="reiniciar(${timer.id})"
                >
                    Reiniciar
                </button>

                <button
                    class="btn-edit"
                    onclick="editar(${timer.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-danger"
                    onclick="eliminar(${timer.id})"
                >
                    Eliminar
                </button>

            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}


/* -----------------------
   ACTUALIZAR PANTALLA
----------------------- */

function actualizarTiempos() {

    cronometros.forEach(timer => {

        if (!timer.activo)
            return;

        const elemento =
            document.querySelector(
                `[data-timer="${timer.id}"]`
            );

        if (elemento) {

            elemento.textContent =
                formatearTiempo(
                    obtenerTiempo(timer)
                );
        }
    });

}


/* -----------------------
   MODAL
----------------------- */

function abrirModal() {

    modal.classList.add("show");

}


function cerrarModal() {

    modal.classList.remove("show");

    inputNombre.value = "";

    editandoId = null;

}


function nuevoCronometro() {

    editandoId = null;

    modalTitulo.textContent =
        "Nuevo cronómetro";

    inputNombre.value = "";

    abrirModal();

    inputNombre.focus();
}


/* -----------------------
   GUARDAR MODAL
----------------------- */

guardar.addEventListener(
    "click",
    guardarModal
);


function guardarModal() {

    const nombre =
        inputNombre.value.trim();

    if (!nombre) {

        alert(
            "Escribe un nombre para el cronómetro."
        );

        return;
    }


    if (editandoId !== null) {

        const timer =
            cronometros.find(
                timer =>
                    timer.id === editandoId
            );

        if (timer) {

            timer.nombre = nombre;

            guardarDatos();
            renderizar();
        }

    } else {

        crearCronometro(nombre);
    }


    cerrarModal();
}


/* ENTER PARA GUARDAR */

inputNombre.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            guardarModal();

        }
    }
);


/* BOTONES */

botonNuevo.addEventListener(
    "click",
    nuevoCronometro
);

crearPrimero.addEventListener(
    "click",
    nuevoCronometro
);

cancelar.addEventListener(
    "click",
    cerrarModal
);


/* CERRAR AL TOCAR FUERA */

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            cerrarModal();

        }
    }
);


/* -----------------------
   SEGURIDAD PARA EL NOMBRE
----------------------- */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;
}


/* -----------------------
   INICIALIZACIÓN
----------------------- */

renderizar();


/*
Actualizamos únicamente la parte visual
cada 250 ms.

El tiempo real se calcula utilizando
Date.now(), por lo que no pierde tiempo
aunque la pestaña quede en segundo plano.
*/

setInterval(
    actualizarTiempos,
    250
);

/* -----------------------
   POPUP DE BIENVENIDA
----------------------- */

const welcomeModal =
    document.getElementById("welcomeModal");

const cerrarWelcome =
    document.getElementById("cerrarWelcome");

const noMostrarDeNuevo =
    document.getElementById("noMostrarDeNuevo");


/* Revisar si ya fue ocultado */

const ocultarBienvenida =
    localStorage.getItem("ocultarBienvenida");


if (ocultarBienvenida === "true") {

    welcomeModal.classList.add("hidden");

}


/* Cerrar popup */

cerrarWelcome.addEventListener(
    "click",
    () => {

        if (noMostrarDeNuevo.checked) {

            localStorage.setItem(
                "ocultarBienvenida",
                "true"
            );

        }

        welcomeModal.classList.add("hidden");

    }
);
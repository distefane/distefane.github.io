/* =====================================================
   TRADUCCIONES
===================================================== */

const traducciones = {

    es: {

        pageTitle: "Mis Cronómetros",

        appTitle: "Mis cronómetros",

        appSubtitle:
            "Registra el tiempo que dedicas a cada actividad.",

        newTimer:
            "+ Nuevo cronómetro",

        createTimer:
            "Crear cronómetro",

        emptyTitle:
            "No tienes cronómetros",

        emptyText:
            "Crea uno para comenzar a registrar tu tiempo.",


        /* BOTONES */

        start:
            "Iniciar",

        pause:
            "Pausar",

        reset:
            "Reiniciar",

        edit:
            "Editar",

        delete:
            "Eliminar",

        save:
            "Guardar",

        cancel:
            "Cancelar",


        /* ESTADOS */

        running:
            "● En ejecución",

        paused:
            "Pausado",


        /* MODAL */

        newTimerTitle:
            "Nuevo cronómetro",

        editTimerTitle:
            "Editar cronómetro",

        inputPlaceholder:
            "Ej. Trabajar en informe EPS",

        emptyNameAlert:
            "Escribe un nombre para el cronómetro.",

        deleteConfirm:
            nombre =>
                `¿Seguro que deseas eliminar "${nombre}"?`,


        /* BIENVENIDA */

        welcomeLabel:
            "Información",

        welcomeTitle:
            "Bienvenido a Mis Cronómetros",

        welcomeIntro:
            "Esta herramienta te permite registrar cuánto tiempo dedicas a diferentes actividades de forma sencilla.",

        howTitle:
            "¿Cómo funciona?",

        howText:
            "Puedes crear varios cronómetros y asignarle un nombre a cada uno. Por ejemplo: Estudiar, Trabajo, Proyecto EPS o cualquier otra actividad.",

        featuresTitle:
            "¿Qué puedes hacer?",

        feature1:
            "Crear todos los cronómetros que necesites.",

        feature2:
            "Iniciar y pausar cada cronómetro manualmente.",

        feature3:
            "Tener varios cronómetros funcionando al mismo tiempo.",

        feature4:
            "Editar el nombre de cada actividad.",

        feature5:
            "Reiniciar un cronómetro cuando lo necesites.",

        feature6:
            "Eliminar actividades que ya no quieras conservar.",

        storageTitle:
            "Tu información se guarda automáticamente",

        storageText1:
            "Los cronómetros se guardan en este navegador, por lo que puedes cerrar o recargar la página y tus actividades seguirán disponibles.",

        storageText2:
            "Si un cronómetro queda activo, continuará contabilizando el tiempo aunque cierres la página y regreses después.",

        tipTitle:
            "Consejo:",

        tipText:
            "cuando cambies de actividad, pausa el cronómetro anterior e inicia el nuevo.",

        dontShow:
            "No volver a mostrar esta información",

        welcomeButton:
            "Entendido, empezar"
    },


    en: {

        pageTitle:
            "My Timers",

        appTitle:
            "My Timers",

        appSubtitle:
            "Track how much time you spend on each activity.",

        newTimer:
            "+ New timer",

        createTimer:
            "Create timer",

        emptyTitle:
            "You don't have any timers",

        emptyText:
            "Create one to start tracking your time.",


        /* BUTTONS */

        start:
            "Start",

        pause:
            "Pause",

        reset:
            "Reset",

        edit:
            "Edit",

        delete:
            "Delete",

        save:
            "Save",

        cancel:
            "Cancel",


        /* STATUS */

        running:
            "● Running",

        paused:
            "Paused",


        /* MODAL */

        newTimerTitle:
            "New timer",

        editTimerTitle:
            "Edit timer",

        inputPlaceholder:
            "E.g. Work on project",

        emptyNameAlert:
            "Enter a name for the timer.",

        deleteConfirm:
            nombre =>
                `Are you sure you want to delete "${nombre}"?`,


        /* WELCOME */

        welcomeLabel:
            "Information",

        welcomeTitle:
            "Welcome to My Timers",

        welcomeIntro:
            "This tool helps you track how much time you spend on different activities in a simple way.",

        howTitle:
            "How does it work?",

        howText:
            "You can create multiple timers and give each one a name. For example: Study, Work, Project or any other activity.",

        featuresTitle:
            "What can you do?",

        feature1:
            "Create as many timers as you need.",

        feature2:
            "Start and pause each timer manually.",

        feature3:
            "Run multiple timers at the same time.",

        feature4:
            "Edit the name of each activity.",

        feature5:
            "Reset a timer whenever you need to.",

        feature6:
            "Delete activities you no longer want to keep.",

        storageTitle:
            "Your information is saved automatically",

        storageText1:
            "Your timers are stored in this browser, so you can close or refresh the page and your activities will still be available.",

        storageText2:
            "If a timer is left running, it will continue counting time even if you close the page and return later.",

        tipTitle:
            "Tip:",

        tipText:
            "when you switch activities, pause the previous timer and start the new one.",

        dontShow:
            "Do not show this information again",

        welcomeButton:
            "Got it, start"
    }
};


/* =====================================================
   IDIOMA
===================================================== */

function detectarIdiomaInicial() {

    const idiomaGuardado =
        localStorage.getItem("idioma");

    if (
        idiomaGuardado === "es" ||
        idiomaGuardado === "en"
    ) {
        return idiomaGuardado;
    }

    const idiomaNavegador =
        navigator.language ||
        navigator.userLanguage ||
        "es";

    return idiomaNavegador
        .toLowerCase()
        .startsWith("es")
        ? "es"
        : "en";
}


let idiomaActual =
    detectarIdiomaInicial();


function t(clave) {

    return traducciones[idiomaActual][clave];

}


function cambiarIdioma(idioma) {

    if (
        idioma !== "es" &&
        idioma !== "en"
    ) {
        return;
    }

    idiomaActual = idioma;

    localStorage.setItem(
        "idioma",
        idioma
    );

    document.documentElement.lang =
        idioma;

    actualizarTextosGenerales();

    renderizar();
}


/* =====================================================
   ELEMENTOS
===================================================== */

const contenedor =
    document.getElementById("cronometros");

const emptyState =
    document.getElementById("emptyState");

const botonNuevo =
    document.getElementById("nuevoCronometro");

const crearPrimero =
    document.getElementById("crearPrimero");

const modal =
    document.getElementById("modal");

const inputNombre =
    document.getElementById("nombreCronometro");

const guardar =
    document.getElementById("guardar");

const cancelar =
    document.getElementById("cancelar");

const modalTitulo =
    document.getElementById("modalTitulo");


/* BIENVENIDA */

const welcomeModal =
    document.getElementById("welcomeModal");

const cerrarWelcome =
    document.getElementById("cerrarWelcome");

const noMostrarDeNuevo =
    document.getElementById("noMostrarDeNuevo");


/* =====================================================
   DATOS
===================================================== */

let cronometros =
    JSON.parse(
        localStorage.getItem("cronometros")
    ) || [];


let editandoId = null;


/* =====================================================
   TRADUCIR INTERFAZ
===================================================== */

function actualizarTextosGenerales() {

    document.title =
        t("pageTitle");

    document
        .querySelectorAll("[data-i18n]")
        .forEach(elemento => {

            const clave =
                elemento.dataset.i18n;

            const traduccion =
                traducciones[idiomaActual][clave];

            if (
                typeof traduccion === "string"
            ) {

                elemento.textContent =
                    traduccion;

            }

        });


    inputNombre.placeholder =
        t("inputPlaceholder");


    document
        .querySelectorAll(".language-btn")
        .forEach(boton => {

            boton.classList.toggle(
                "active",
                boton.dataset.lang ===
                    idiomaActual
            );

        });


    /*
       El título del modal debe actualizarse
       dependiendo de si estamos creando
       o editando.
    */

    if (
        modal.classList.contains("show")
    ) {

        modalTitulo.textContent =
            editandoId !== null
                ? t("editTimerTitle")
                : t("newTimerTitle");

    } else {

        modalTitulo.textContent =
            t("newTimerTitle");

    }

}


/* =====================================================
   GUARDAR DATOS
===================================================== */

function guardarDatos() {

    localStorage.setItem(
        "cronometros",
        JSON.stringify(cronometros)
    );

}


/* =====================================================
   CREAR CRONÓMETRO
===================================================== */

function crearCronometro(nombre) {

    const cronometro = {

        id:
            Date.now(),

        nombre:
            nombre,

        tiempoAcumulado:
            0,

        inicio:
            null,

        activo:
            false
    };


    cronometros.push(
        cronometro
    );

    guardarDatos();

    renderizar();
}


/* =====================================================
   INICIAR
===================================================== */

function iniciar(id) {

    const timer =
        cronometros.find(
            timer =>
                timer.id === id
        );


    if (
        !timer ||
        timer.activo
    ) {
        return;
    }


    timer.activo = true;

    timer.inicio =
        Date.now();


    guardarDatos();

    renderizar();
}


/* =====================================================
   PAUSAR
===================================================== */

function pausar(id) {

    const timer =
        cronometros.find(
            timer =>
                timer.id === id
        );


    if (
        !timer ||
        !timer.activo
    ) {
        return;
    }


    const ahora =
        Date.now();


    timer.tiempoAcumulado +=
        ahora - timer.inicio;


    timer.activo =
        false;

    timer.inicio =
        null;


    guardarDatos();

    renderizar();
}


/* =====================================================
   REINICIAR
===================================================== */

function reiniciar(id) {

    const timer =
        cronometros.find(
            timer =>
                timer.id === id
        );


    if (!timer) {
        return;
    }


    timer.tiempoAcumulado =
        0;


    if (timer.activo) {

        timer.inicio =
            Date.now();

    }


    guardarDatos();

    renderizar();
}


/* =====================================================
   ELIMINAR
===================================================== */

function eliminar(id) {

    const timer =
        cronometros.find(
            timer =>
                timer.id === id
        );


    if (!timer) {
        return;
    }


    const confirmar =
        window.confirm(
            t("deleteConfirm")(
                timer.nombre
            )
        );


    if (!confirmar) {
        return;
    }


    cronometros =
        cronometros.filter(
            timer =>
                timer.id !== id
        );


    guardarDatos();

    renderizar();
}


/* =====================================================
   EDITAR
===================================================== */

function editar(id) {

    const timer =
        cronometros.find(
            timer =>
                timer.id === id
        );


    if (!timer) {
        return;
    }


    editandoId =
        id;


    inputNombre.value =
        timer.nombre;


    modalTitulo.textContent =
        t("editTimerTitle");


    abrirModal();

    inputNombre.focus();
}


/* =====================================================
   CALCULAR TIEMPO
===================================================== */

function obtenerTiempo(timer) {

    let tiempo =
        timer.tiempoAcumulado;


    if (
        timer.activo &&
        timer.inicio
    ) {

        tiempo +=
            Date.now() -
            timer.inicio;

    }


    return tiempo;
}


/* =====================================================
   FORMATEAR TIEMPO
===================================================== */

function formatearTiempo(ms) {

    const segundosTotales =
        Math.floor(
            ms / 1000
        );


    const horas =
        Math.floor(
            segundosTotales /
            3600
        );


    const minutos =
        Math.floor(
            (
                segundosTotales %
                3600
            ) /
            60
        );


    const segundos =
        segundosTotales %
        60;


    return [
        horas,
        minutos,
        segundos
    ]
        .map(numero =>
            String(numero)
                .padStart(
                    2,
                    "0"
                )
        )
        .join(":");
}


/* =====================================================
   RENDERIZAR
===================================================== */

function renderizar() {

    contenedor.innerHTML =
        "";


    if (
        cronometros.length === 0
    ) {

        emptyState.style.display =
            "block";

        return;
    }


    emptyState.style.display =
        "none";


    cronometros.forEach(
        timer => {

            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "timer-card";


            tarjeta.innerHTML = `

                <div class="timer-info">

                    <h2>
                        ${escaparHTML(
                            timer.nombre
                        )}
                    </h2>

                    <p
                        class="estado ${
                            timer.activo
                                ? "activo"
                                : ""
                        }"
                    >

                        ${
                            timer.activo
                                ? t("running")
                                : t("paused")
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
                                ${t("pause")}
                            </button>

                        `

                        : `

                            <button
                                class="btn-start"
                                onclick="iniciar(${timer.id})"
                            >
                                ${t("start")}
                            </button>

                        `
                    }


                    <button
                        class="btn-secondary"
                        onclick="reiniciar(${timer.id})"
                    >
                        ${t("reset")}
                    </button>


                    <button
                        class="btn-edit"
                        onclick="editar(${timer.id})"
                    >
                        ${t("edit")}
                    </button>


                    <button
                        class="btn-danger"
                        onclick="eliminar(${timer.id})"
                    >
                        ${t("delete")}
                    </button>

                </div>
            `;


            contenedor.appendChild(
                tarjeta
            );

        }
    );
}


/* =====================================================
   ACTUALIZAR SOLO LOS TIEMPOS
===================================================== */

function actualizarTiempos() {

    cronometros.forEach(
        timer => {

            if (!timer.activo) {
                return;
            }


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

        }
    );

}


/* =====================================================
   MODAL
===================================================== */

function abrirModal() {

    modal.classList.add(
        "show"
    );

}


function cerrarModal() {

    modal.classList.remove(
        "show"
    );


    inputNombre.value =
        "";


    editandoId =
        null;


    modalTitulo.textContent =
        t("newTimerTitle");
}


function nuevoCronometro() {

    editandoId =
        null;


    modalTitulo.textContent =
        t("newTimerTitle");


    inputNombre.value =
        "";


    abrirModal();


    setTimeout(
        () =>
            inputNombre.focus(),
        50
    );

}


/* =====================================================
   GUARDAR CREACIÓN / EDICIÓN
===================================================== */

function guardarModal() {

    const nombre =
        inputNombre
            .value
            .trim();


    if (!nombre) {

        alert(
            t("emptyNameAlert")
        );

        return;
    }


    if (
        editandoId !== null
    ) {

        const timer =
            cronometros.find(
                timer =>
                    timer.id ===
                    editandoId
            );


        if (timer) {

            timer.nombre =
                nombre;


            guardarDatos();

            renderizar();

        }

    } else {

        crearCronometro(
            nombre
        );

    }


    cerrarModal();
}


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escaparHTML(texto) {

    const elemento =
        document.createElement(
            "div"
        );


    elemento.textContent =
        texto;


    return elemento.innerHTML;
}


/* =====================================================
   EVENTOS
===================================================== */

guardar.addEventListener(
    "click",
    guardarModal
);


inputNombre.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            guardarModal();

        }


        if (
            event.key === "Escape"
        ) {

            cerrarModal();

        }

    }
);


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


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            cerrarModal();

        }

    }
);


/* SELECTORES DE IDIOMA */

document
    .querySelectorAll(
        ".language-btn"
    )
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    cambiarIdioma(
                        boton.dataset.lang
                    );

                }
            );

        }
    );


/* =====================================================
   POPUP DE BIENVENIDA
===================================================== */

const ocultarBienvenida =
    localStorage.getItem(
        "ocultarBienvenida"
    );


if (
    ocultarBienvenida ===
    "true"
) {

    welcomeModal.classList.add(
        "hidden"
    );

}


cerrarWelcome.addEventListener(
    "click",
    () => {

        if (
            noMostrarDeNuevo.checked
        ) {

            localStorage.setItem(
                "ocultarBienvenida",
                "true"
            );

        }


        welcomeModal.classList.add(
            "hidden"
        );

    }
);


/* =====================================================
   INICIALIZACIÓN
===================================================== */

document.documentElement.lang =
    idiomaActual;


actualizarTextosGenerales();

renderizar();


/*
    Actualizamos la pantalla varias veces por segundo,
    pero el tiempo real se obtiene con Date.now().

    Esto evita que el cronómetro pierda precisión
    cuando la pestaña queda en segundo plano.
*/

setInterval(
    actualizarTiempos,
    250
);
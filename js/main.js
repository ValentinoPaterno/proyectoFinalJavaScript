// Elementos traidos del HTML
let preguntasfrecuentes = document.getElementById("preguntas-frecuentes");
let aclaracion1 = document.getElementById("aclaracion1");
let aclaracion2 = document.getElementById("aclaracion2");
let containerEntendido = document.getElementById("entendido-container");
let entendido = document.getElementById("entendido");
// Eventos
entendido.addEventListener("click", desplegarOpciones);
// event handler (entendido);
function desplegarOpciones(){
    containerEntendido.remove();
    aclaracion1.innerHTML = `<p> ¿Desea ver los turnos guardados? </p>`
    aclaracion2.innerHTML = `<p> Cliquee en la opcion deseada </p>`
    let si = document.createElement("button");
    aclaracion2.appendChild(si);
    si.addEventListener("click", funcionBotonSi);
    si.innerText = "Si";
    si.setAttribute("id", "buttonSi");
    let no = document.createElement("button");
    aclaracion2.appendChild(no);
    no.addEventListener("click", functionBotonNo);
    no.setAttribute("id", "buttonNo");
    no.innerText = "No";
}


// event handlers para opcion "si" o "no"
function funcionBotonSi() {
    borrarBotones();
    aclaracion1.classList.add("oculto");
    aclaracion2.innerHTML = 
    '<p>Los turnos guardados son:</p>'
    fetch("../turnos.json")
    .then( (res) => res.json())
    .then( (dato) => {
            dato.forEach((persona) => {
            const div = document.createElement("div");
            div.setAttribute("class", "preguntas");
            div.innerHTML = `
            <p>Nombre: ${persona.nombre}</p>
            <p>Apellido: ${persona.apellido}</p>
            <p>Turno: ${persona.hora}</p>
            `
            preguntasfrecuentes.appendChild(div);
        });
    })
    
}
function functionBotonNo() {
    borrarBotones();
    preguntasfrecuentes.removeChild(aclaracion2);
    preguntasfrecuentes.innerHTML += `
    <div class="preguntas" id="aclaracion3">
        <p>¿Quiere agregar un nuevo turno?</p>
        <button id="button-si" class="button">Si</button>
        <button id="button-no" class="button">No</button>
    </div> `;
    let buttonSi = document.getElementById("button-si");
    let aclaracion3 = document.getElementById("aclaracion3");
    buttonSi.onclick = () => {
        aclaracion3.classList.add("oculto");
        agregarTurno();
    }
}


// funcion para borrar los botones
function borrarBotones() {
    let si = document.getElementById("buttonSi");
    let no = document.getElementById("buttonNo");
    aclaracion2.removeChild(si);
    aclaracion2.removeChild(no);
}
// funcion para agregar un turno
const agregarTurno = () => {
    let container = document.createElement("div");
    container.setAttribute("id", "containerAgregarTurno");
    container.setAttribute("class", "preguntas");
    container.innerHTML = `
    <p class="textoGrande"> Agregue el turno deseado! </p>
    <label>
        Ingrese el nombre:
        <input id="inputNombre" class="imputs" type="text"></input>
    </label>
    <label>
        Ingrese el apellido:
        <input id="inputApellido" class="imputs" type="text"></input>
    </label> 
    <label>
        Ingrese la hora:
        <input id="inputHora" class="imputs" type="time"></input>
    </label>
    <button id="buttonGuardar">Guardar</button>`;
    preguntasfrecuentes.appendChild(container);
    let buttonGuardar = document.getElementById("buttonGuardar");
    buttonGuardar.addEventListener("click", enviarValores);
}
// event handler para enviar los valores de los imputs al presionar "guardar"
const turnos = [];
class Persona{
    constructor(nombre, apellido, hora){
        this.nombre = nombre;
        this.apellido = apellido;
        this.hora = hora;
    }
}
function enviarValores() {
    let inputNombre = document.getElementById("inputNombre").value;
    let inputApellido = document.getElementById("inputApellido").value;
    let inputHora = document.getElementById("inputHora").value;
    if((inputNombre && inputApellido && inputHora) != "") {
        turnos.push(new Persona(inputNombre, inputApellido, inputHora));
        aclaracion2.innerHTML += 
        `<div class="personas">
            <p>Nombre: ${inputNombre}</p>
            <p>Apellido :${inputApellido}</p>
            <p>Hora: ${inputHora}</p>
        </div>`
        let buttonGuardar = document.getElementById("buttonGuardar");
        buttonGuardar.removeEventListener("click", enviarValores);
        let container = document.getElementById("containerAgregarTurno");
        container.innerHTML = '<p>Turno Añadido!</p>'
    } else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Complete todos los campos con información!',
        })
    }
}

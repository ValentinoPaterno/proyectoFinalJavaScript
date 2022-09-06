// function enviarStorage() {
//     if(isNaN(nombre) && isNaN(apellido) && nombre != "" && apellido != ""){
//         localStorage.setItem("nombre", nombre);
//         localStorage.setItem("apellido", apellido);
//         Swal.fire({
//             icon: 'success'
//         })
//     } else{

//     }
// }


// Nodos
const body = document.getElementById("body-index");
const divLogin = document.getElementById("div-login");
const divRegister = document.getElementById("div-register");
const tituloIndex = document.getElementById("h1-index");
const wrapperIndex = document.getElementById("wrapper-login-register");
const login = document.getElementById("btn-login");
const register = document.getElementById("btn-register");

// Evento para logearse
login.onclick = () => {
    divRegister.removeChild(register)
    divLogin.removeChild(login);
    const form = document.createElement("form");
    form.setAttribute("class", "form-flex");
    form.innerHTML = 
    `<input id="user-form" type="email" placeholder="Usuario o correo">
    <input id="password-form" type="password" placeholder="Contraseña">`;
    const submit = document.createElement("input");
    const volver = document.createElement("a");
    volver.setAttribute("id", "a-volver-index");
    volver.setAttribute("href", "../index.html");
    volver.innerText = "Volver";
    submit.setAttribute("type","submit");
    submit.setAttribute("value", "Login");
    submit.setAttribute("class", "submit")
    // evento "submit"
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        let user = document.getElementById("user-form").value;
        let password = document.getElementById("password-form").value;
        let usuariostorage = localStorage.getItem("Usuario", user);
        let passwordstorage = localStorage.getItem("Contraseña", password);
        if((user == usuariostorage) && (password == passwordstorage)){
            Swal.fire({
                icon: 'success',
                title: `Bienvenido! ${user}`,
            });
            divLogin.removeChild(form);
            let ingresarAPag = document.createElement("a");
            ingresarAPag.innerText = `Ingresar`;
            ingresarAPag.setAttribute("href", "./html/main.html");
            divLogin.appendChild(ingresarAPag);
        } else{
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal :(',
                text: `Usted no se encuentra registrado, o sus datos no coinciden, pruebe denuevo`,
            });
        }
    });
    form.appendChild(submit);
    form.appendChild(volver);
    divLogin.appendChild(form);
}

register.onclick = () => {
    divRegister.removeChild(register)
    divLogin.removeChild(login);
    const form = document.createElement("form");
    form.setAttribute("class", "form-flex");
    form.innerHTML = 
    `<input id="user-form-register" type="email" placeholder="Usuario">
    <input id="password-form-register" type="password" placeholder="Contraseña">
    <input id="passwordconfirm-form-register" type="password" placeholder="Confirmar contraseña">
    <input id="email-form-register" type="email" placeholder="Correo electrónico">`;
    const submit = document.createElement("input");
    const volver = document.createElement("a");
    volver.setAttribute("id", "a-volver-index");
    volver.setAttribute("href", "../index.html");
    volver.innerText = "Volver";
    submit.setAttribute("type","submit");
    submit.setAttribute("value", "Registrarme");
    submit.setAttribute("class", "submit");
    submit.onclick = (e) => {
        e.preventDefault();
        let user = document.getElementById("user-form-register").value;
        let password = document.getElementById("password-form-register").value;
        let confirmPassword = document.getElementById("passwordconfirm-form-register").value;
        let email = document.getElementById("email-form-register").value;
        if((user != "") && (password != "") && (confirmPassword === password) && email.includes("@")){
            Swal.fire({
                icon: 'success',
                title: 'Cuenta registrada!',
                })
            localStorage.setItem("Usuario", user);
            localStorage.setItem("Contraseña", password);
        } else{
            swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Recuerde rellenar bien los campos, las contraseñas deben coincidir y ningun campo puede estar vacio',
            })
        }
    }
    divLogin.appendChild(form);
    form.appendChild(submit);
    form.appendChild(volver);
}


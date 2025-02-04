let max = 10;
let intentos;
let numeroSecreto = 0;
let numUsuario = 0;
let numerosGenerados = [];
let intentosRestantes = 0;

configIniciales();

function configIniciales() {
  intentos = 0;
  intentosRestantes = 3; //facil
  let opcion = parseInt(
    prompt(
      "!Bienvenido! Escribe 1 para jugar en modo fácil, 2 dificil, 3 muy dificil, otro para salir: "
    )
  );
  switch (opcion) {
    case 1:
      max = 10;
      break;
    case 2:
      (max = 50), (intentosRestantes = 5);
      break;
    case 3:
      (max = 100), (intentosRestantes = 7);
      break;
    default:
      alert("Hasta pronto!");
      addTextToSelector("h1", "El juego ha terminado");
      addTextToSelector(
        "p",
        "Presione F5 para volver a jugar, o deslice el dedo hacia abajo en su pantalla táctil"
      );
      ocultarBotones();
      return;
  }
  addTextToSelector("h1", "Adivina el número secreto");
  addTextToSelector("p", `El número secreto está entre 1 y ${max}`);
  numeroSecreto = generarNumeroSecreto();
}

/*hoisting en accion*/
/**
 * @param {string} p_selector recibe la etiqueta HTML
 * @param {string} p_texto recibe el texto para unir al selector
 */
function addTextToSelector(p_selector, p_texto) {
  try {
    let selector = document.querySelector(p_selector);
    selector.innerHTML = p_texto;
  } catch (error) {
    console.error("Error al agregar texto a selector: ", error);
  }
}

/*
 * Genera un num random y lo inserta en un arreglo antes de retornarlo.
 */
function generarNumeroSecreto() {
  console.log(numerosGenerados);
  let nuevoNum = Math.floor(Math.random() * max) + 1;
  if (numerosGenerados.length > max - 1) {
    addTextToSelector(
      "p",
      "No se pueden agregar más números. Recargue la página"
    );
    ocultarBotones();
    return 0;
  } else {
    if (!numerosGenerados.includes(nuevoNum)) {
      //if not true
      numerosGenerados.push(nuevoNum);
      return nuevoNum;
    } else {
      return generarNumeroSecreto();
    }
  }
}

/**
 * Reinicia los botones dejando uno activado y el otro desactivado
 */
function reiniciarBotones() {
  let b_intentar = document.getElementById("intentar");
  let b_reiniciar = document.getElementById("reiniciar");
  if (b_intentar.getAttribute("disabled") === null) {
    b_intentar.setAttribute("disabled", "true");
    b_reiniciar.removeAttribute("disabled");
  } else {
    b_intentar.removeAttribute("disabled");
    b_reiniciar.setAttribute("disabled", "true");
  }
}

function ocultarBotones() {
  document.getElementById("intentar").setAttribute("disabled", "true");
}

/**
 * Esta funcion es activada desde el evento onclick en HTML
 * Controla que sea numero el ingreso de dato
 * Compara con el numero secreto y configura los mensajes de acuerdo el suceso ocurrido
 */
function verificarIntento() {
  let numUsuario = parseInt(document.getElementById("valorUsuario").value);
  if (isNaN(numUsuario) || numUsuario < 1 || numUsuario > max) {
    alert(`¡Debes ingresar un número entre 1 y ${max}!`);
    limpiarCaja();
    return;
  } else {
    jugar(numUsuario);
  }
  if ((intentosRestantes === 0)) {
    addTextToSelector(
      "p",
      `Te quedaste sin intentos. El número secreto era: ${numeroSecreto}`
    );
    reiniciarBotones();
  }
}
//Contiene la logica del juego una vez verificada las condiciones
function jugar(p_numUsuario) {
  intentos++;
  intentosRestantes--;
  if (p_numUsuario === numeroSecreto) {
    addTextToSelector(
      "p",
      `¡Felicidades! Has acertado el número secreto en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      } `
    );
    reiniciarBotones();
    return;
  } else if (p_numUsuario < numeroSecreto) {
    addTextToSelector(
      "p",
      `El número secreto es mayor que ${p_numUsuario}. ${
        intentosRestantes === 1 ? "Intento" : "Intentos"
      } restantes: ${intentosRestantes}`
    );
  } else {
    addTextToSelector(
      "p",
      `El número secreto es menor que ${p_numUsuario}. ${
        intentosRestantes === 1 ? "Intento" : "Intentos"
      } restantes: ${intentosRestantes}`
    );
  }
  limpiarCaja();
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function reiniciarJuego() {
  reiniciarBotones();
  limpiarCaja();
  configIniciales();
}

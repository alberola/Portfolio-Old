//Tenemos un array de imagenes el cual copiamos dos veces y reordenamos aleatoriamente para introducir las cartas;
var imagenes = ["img/img0.png","img/img1.png","img/img2.png","img/img3.png","img/img4.png","img/img5.png"];
var imagenesGeneral = [].concat(imagenes).concat(imagenes);
imagenesGeneral.sort(function() { return Math.random() - 0.5 });
console.log(imagenesGeneral);

//Variables del programa
var contador = 0;
var auxSrc = 0;
var contadorErrores = 0;

//Seleccionamos todos los divs que contienen imagenes y al clickar llamaremos a la función comprobar que se encargará de introducir la lógica
var selector = document.querySelectorAll('.imagen');
for (var i = 0; i < selector.length; i++) {
    selector[i].addEventListener('click', ayudaComprobar);
    selector[i].setAttribute("src", "img/back.png");
    selector[i].value = i;
}
console.log(selector.length);
//Con la función comprobar voltearemos la carta (cambiar src) segun su valor coincidiendo con el array de imagenes, si la ruta de
//esta es igual a la siguiente carta contador general = 1;
function comprobar(imagen)  {
    let valor = imagen.value;
    selector[valor].setAttribute("src", imagenesGeneral[valor]);
    selector[valor].classList.add("cambio");
    console.log(selector[valor]);
    //Eliminamos evento de escucha para evitar que se ejecuten trampas
    selector[valor].removeEventListener('click', ayudaComprobar);
    //Comprobaremos y meteremos datos en la variables comprobando que no estan escritas
    if (auxSrc == 0) {
        auxSrc = selector[valor];
    } else {
        //Si ambos links (imagenes) son iguales reiniciaremos auxSrc y aumentaremos la variable contador
        if (auxSrc.src == selector[valor].src){
            contador++;
            console.log(auxSrc);
            auxSrc = 0;
            console.log(contador);
            //Fin del juego en función de la cantidad acertada
            if (contador == (selector.length)/2){
                Swal.fire({
                    icon: 'success',
                    title: 'Felicidades!',
                    html:'Has completado el juego...<br>Aciertos = '+contador +'<br>Errores = '+contadorErrores
                })
            }
        //En caso contrario voltearemos de nuevo las cartas
        } else {

            //TODAS LAS FUNCIONES DECLARADAS AQUÍ SON PARA HACER FUNCIONAR LOS SETTIMEOUTS

            function removerCambio(){auxSrc.classList.remove("cambio");}
            setTimeout(removerCambio, 1200);
            //Creamos funcion para que funciones el timeout
            function meterFondo() {auxSrc.setAttribute("src","img/back.png");}
            setTimeout(meterFondo , 1300);
            function removerCambio2(){selector[valor].classList.remove("cambio");}
            setTimeout(removerCambio2, 1200);
            //Creamos funcion para que funciones el timeout
            function meterFondo2() {selector[valor].setAttribute("src","img/back.png");}
            setTimeout(meterFondo2, 1300);
            //Captura de errores
            contadorErrores++;
            //Al no encontrar coincidencia en ambas cartas meteremos los eventos de escucha de nuevo
            auxSrc.addEventListener('click', ayudaComprobar);
            selector[valor].addEventListener('click', ayudaComprobar);
            //Por ultimo reiniciaremos el valor de auxSrc que se ejecute (metemos un poco mas de tiempo que los cambios de imagen para que no de conflicto)
            function resetearAux(){ auxSrc = 0;}
            setTimeout(resetearAux, 1500);
            
        }
    }
}

//Funcion para mejorar el evento de escucha (no de errores al llamar en el evento)
function ayudaComprobar () {
    comprobar(this);
}
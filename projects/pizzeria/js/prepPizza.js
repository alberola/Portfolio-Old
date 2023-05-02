
//Variables auxiliares
const toppingsList = document.querySelectorAll('.btn-light');
const crustList = document.querySelectorAll('#crust');
const cartList = document.querySelector('#carrito');
const total = document.querySelector('#total');
const clearBtn = document.querySelector('#boton-vaciar');
var contador = 0;

//Carrito de compra
var cart = [];
console.log(cart.length);
//Variable para imprimir pdf 
const pdfCrear = document.querySelector('#boton-pdf');

//Evento para generar el pdf
pdfCrear.addEventListener('click', () => {
  //Comprobamos que se hayan seleccionado 1 ingrediente y la masa
  if (cart.length <= 1 || (cart.find(element => element.id == 'crust')) == null){
    Swal.fire({
        text: 'You must select the crust and 1 ingredient at least.',
        icon: 'error',
        confirmButtonText: 'Confirm',
        confirmButtonColor: 'black'
    })
  } else {
    let doc = new jsPDF();
    doc.text(20, 20, 'Pizzeria Pizzaluna');
    doc.text(20, 30, 'Toppings:');
    let y = 40;
    let auxVar;
    cart.forEach(item => {
        if (item.id == 'crust'){
            auxVar = item.value;
        } else {
            doc.text(20, y, `- ${item.value}`);
            y += 10;
        }
    });
    doc.text(20, y, `Crust: `);
    doc.text(20, y+10,  `- ${auxVar}`);
    doc.save('Order.pdf');
  }
});



//Asignamos un evento a cada btn-primary con la funcion de añadir al carrito
toppingsList.forEach(topping => {
  topping.addEventListener('click', () => {
    addToCart(topping.value, topping.id);
  });
});

//Insertamos evento al boton
clearBtn.addEventListener('click', () => {
  clearCart();
});

//Función para añadir articulos al carro
function addToCart(value, id) {
    //Creamos un objeto que tendra un valor (Aqui podriamos indicarle un precio o los atributos que deseemos)
    let item = {
        value: value,
        id: id,
    };
    //Comprobaremos que solo haya insertado una masa
    let alreadyInCart = false;
    cart.forEach(i => {
        if (i.id === id) {
            alreadyInCart = true;
            Swal.fire({
                text: 'You can´t select two types of crusts and only 1 ingredient of each type.',
                icon: 'error',
                confirmButtonText: 'Confirm'
            })
        }
  });
  //Si ya se encuentra el elemnto en el carrito o ya está insertada el tipo de masa
  if (!alreadyInCart) {
    console.log(item.id);
    cart.push(item);
    renderCart();
  }

}

//Función para dar formato al carro cada vez que insertamos o limpiamos
function renderCart() {
  cartList.innerHTML = '';
  cart.forEach(item => {
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = item.value;
    cartList.appendChild(li);
  });
}

//Funcion para limpiar el carro
function clearCart() {
  cart = [];
  renderCart();
}

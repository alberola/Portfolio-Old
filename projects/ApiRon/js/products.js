
//We save the var where we want to print the card
var respuesta = document.querySelector('#respuesta');

//Var for the shop cart
var cart = [];
var objeto;


//Event Listener to clear the offCanvas cart
document.querySelector('#clearCanvas').addEventListener("click", function clearCanvas() {
    document.querySelector('.elementosCanvas').innerHTML = "";
    cart = [];
    //We update the cookie value
    setCookie('cookieCart', JSON.stringify(cart), 9999);
    updateCart();
})

//Function to obtain idDrink (his value) and update the cart, canvas and the cookie
function obtainId(idDrink){
    cart.push(idDrink.id);
    setCookie('cookieCart', JSON.stringify(cart), 9999);
    document.querySelector('.elementosCanvas').innerHTML += "<div class='my-1 d-flex justify-content-between'><li class='list-group-item rounded w-100' id='elemento"+idDrink.id+"'>"+ document.getElementById('nombre'+idDrink.id).innerText + "</li><button class='btn btn-danger mx-2 p-2' value="+idDrink.id+" onclick='deleteElementCanvas(this)'>-</button></div>";
    updateCart();
}
    //We call the api and if the data is correct we type the values

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum')
    .then( res => res.json())
    .then( data => {
        console.log(data);
        if(data == undefined){
            respuesta.innerHTML = "<div class='alert alert-danger' role='alert'> LLena todos los campos</div>";
        } else {  
            console.log("Entran datos correctamente");
            data.drinks.forEach(element => {
                respuesta.innerHTML += 
                "<div class='col my-4'>"+
                    "<div class='card ' style='width: 18rem;' id="+element.idDrink+">"+
                        "<img src="+element.strDrinkThumb+" class='card-img-top rounded' alt='...'>"+
                        "<div class='card-body'>"+
                            "<h5 id=nombre"+element.idDrink+" class='card-title m-b5'>"+element.strDrink+"</h5>"+
                            "<a href='#' class='btn btn-dark boton' id="+element.idDrink+" data-bs-toggle='offcanvas' data-bs-target='#offcanvasWithBothOptions' aria-controls='offcanvasWithBothOptions' onclick=obtainId(this)>Añadir al Carrito</a>"+
                        "</div>"+
                    "</div>"+
                "</div>"; 
            });
            
        }
        //we check if the cookie have any preset values
        if (getCookie('cookieCart') !== "") {
            //We update the cart value
            cart = JSON.parse(getCookie('cookieCart'));
            cart.forEach(element => {
                document.querySelector('.elementosCanvas').innerHTML += "<div class='my-1 d-flex justify-content-between'><li class='list-group-item rounded w-100' id='elemento"+element+"'>"+ document.getElementById('nombre'+element).innerText + "</li><button class='btn btn-danger mx-2 p-2' value="+element+" onclick='deleteElementCanvas(this)'>-</button></div>";
                updateCart();
            });
        } 
    })


//Function to delete Elements already in canvas
function deleteElementCanvas (elementCanvas){
    //We pass the element to delete first from the cart array
    deleteFromCart(elementCanvas);
    //We remove the element from the html with the id
    document.getElementById("elemento"+elementCanvas.value).remove();
    //At the end we remove the element as well
    elementCanvas.remove();
    //Update the cart html
    updateCart ();

}
//Function to delete Elements already in cart
function deleteFromCart (elementCart) {
    //We select the index of the element we want to delete and we do it
    cart.splice(cart.indexOf(elementCart.value), 1);
    //We update the cookieValue
    setCookie('cookieCart', JSON.stringify(cart), 9999);
}

//If we insert an element in the cart we have to increment the num of elements in the page
function updateCart () {
    let cartNum = document.querySelector('#numDrinks');
    console.log(cart.length);
    if (cart.length == 0) {
        console.log('caso negativo');
        cartNum.innerHTML = '';
    } else {
        console.log('caso positivo');
        cartNum.innerHTML = cart.length;
    }
}

//Order button to print PDF
    var pdfCreate = document.querySelector('#pdfButton');
    pdfCreate.addEventListener('click', () => {
        //we have to check if the cart is empty or not
        if (cart.length == 0){
          Swal.fire({
              text: 'Necesitas seleccionar al menos 1 bebida.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: 'black'
          })
        } else {
          let doc = new jsPDF();
          doc.text(20, 20, 'Cocteles');
          let y = 30;
          cart.forEach(elemento => {
            doc.text(20, y, document.getElementById('nombre'+elemento).innerText);
            y += 10;
          });
          doc.save('Pedido.pdf');
        }
    });

// set Value to the cookie
function setCookie(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// get the Cookie values
function getCookie(name) {
    var name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

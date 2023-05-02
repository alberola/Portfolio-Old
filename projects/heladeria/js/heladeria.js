//Var for the ice cream creation
let stocks = {
    Fruits : ["strawberry", "grapes", "banana", "apple"],
    liquid : ["water", "ice"],
    holder : ["cone", "cup", "stick"],
    toppings : ["chocolate", "peanuts"],
};

//Array for sava values selected
var iceCream = [];
//Var to controlor show and hide contents panels
var contPanels = 0;


//Auto-increment bar width
var progressVar = document.querySelector('.progress-bar');
//Var for imgs
var selector = document.querySelectorAll('img');
console.log(selector);
selector.forEach(element => {
    element.addEventListener('click', function () { getValues(this)})
});

//Function to obtain value selected
function getValues (element) {
    iceCream.push(element.id);
    console.log(element.id);
    console.log(iceCream);
    //Calling to function showHidePanels
    showHidePanels();
    contPanels++;
}

//Function to control show and hide panels
function showHidePanels(){
    //Vars for select containers
    let fruits = document.querySelector('.fruits');
    let recipient = document.querySelector('.recipient');
    let topings = document.querySelector('.topings');
    let final = document.querySelector('.final');
    //Checking the position
    if (contPanels == 0){
        //In each case we change clases to show hide animations and panels
        fruits.classList.add('change');
        setTimeout(() => {
            fruits.classList.remove('d-flex');
            fruits.classList.add('d-none');
            recipient.classList.remove('d-none');
            recipient.classList.add('d-flex');
            progressVar.style.width = '33.33%';
        }, 1500);
    } else if (contPanels == 1) {
        recipient.classList.add('change');
        setTimeout(() => {
            recipient.classList.remove('d-flex');
            recipient.classList.add('d-none');
            topings.classList.remove('d-none');
            topings.classList.add('d-flex');
            progressVar.style.width = '66.66%';
        }, 1500);
    } else if (contPanels == 2) {
        topings.classList.add('change');
        setTimeout(() => {
            topings.classList.remove('d-flex');
            topings.classList.add('d-none');
            final.classList.remove('d-none');
            final.classList.add('d-flex');
            //Creating dinamic elements to give special atributtes
            const div = final.appendChild(document.createElement('div'));
            div.className = 'col-12 col-md-3';
            const img = div.appendChild(document.createElement('img'));
            img.className = 'text-center img-fluid';
            img.setAttribute('src', 'img/finalGift.gif');
            img.setAttribute('alt', 'Gift Generando Helado');
            progressVar.style.width = '100%';
        }, 1500);
        cookingIceCream();
    }
}


//We remove the entrance animation and then we put the rotation animation
setTimeout(() => {
    selector.forEach(element => {
        element.classList.remove('bounce-in-top');
        element.classList.add('rotation');
    });
}, 1500);

//Function to finalize the order
async function cookingIceCream(){
    let text = document.querySelector('.final-text');
    try{
        await time(3000)
        text.innerHTML = iceCream[0]+' Seleccionado.';

        await time(2000)
        text.innerHTML = 'Iniciando la preparación del helado.';

        await time(3000)
        text.innerHTML = 'La fruta ha sido añadida.';

        await time(2000)
        text.innerHTML = 'Agregando el hielo y agua...';

        await time(2000)
        text.innerHTML = 'Iniciando la máquina.';

        await time(3000)
        text.innerHTML = 'Helado colocado en '+iceCream[1]+'.';

        await time(3000)
        text.innerHTML = iceCream[2]+' agregado como decoración.';

        await time(3000)
        text.innerHTML = "Sirviendo su helado...";
        
        await time(1000)
        let doc = new jsPDF();
        doc.text(70, 20, 'Heladeria Dulce Tropic');
        doc.text(20, 30, 'Fruta:');
        doc.text(20, 40, '- '+iceCream[0]);
        doc.text(20, 50, 'Recipiente:');
        doc.text(20, 60, '- '+iceCream[1]);
        doc.text(20, 70, 'Decoración:');
        doc.text(20, 80, '- '+iceCream[2]);
        doc.text(20, 280, 'Muchas gracias por efectuar su pedido en breve le será entregado...');
        doc.save('Order.pdf');
    }

    catch(error){
        text.innerHTML = "Error en la elaboración del helado...";
    }
}

//Promise function
function time(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
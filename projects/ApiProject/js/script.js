//Var to obtain the global container
var container = document.querySelector('#globalContainer');
//Global Array to introduce al the films we have in the webpage (help to use the filter value)
var globalArray = [];
//Var to obtain the cookie favourite films
var favouriteArray = [];

//Disable the form action
document.querySelector('#formControl').addEventListener('submit', function(e) {
    e.preventDefault();
});

//Calling the api to obtain the values
obtainGenresMovies('https://api.themoviedb.org/3/genre/movie/list?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES');

getMovies('https://api.themoviedb.org/3/movie/popular?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES&page=1', 'Populares');
getMovies('https://api.themoviedb.org/3/trending/movie/day?api_key=dda4633aacd800647ce023600f1aae38', 'Tendencia');
getMovies('https://api.themoviedb.org/3/discover/movie?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES&page=1&with_genres=16', 'Animación');
getMovies('https://api.themoviedb.org/3/discover/movie?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES&with_genres=10402', 'Musical');
getMovies('https://api.themoviedb.org/3/discover/movie?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES&with_genres=27', 'Terror');
getMovies('https://api.themoviedb.org/3/movie/upcoming?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES&page=1', 'Próximas Películas');
getMovies('https://api.themoviedb.org/3/discover/movie?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES&with_genres=10749', 'Romance');

//Function to obtain Genres and use the api to call it...
function obtainGenresMovies(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

//Function to obtain the list of movies
function getMovies(url,tittle) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //Using slice to reduce the number of movie we want 
        showMovies(data.results.slice(0, 10), tittle);
        // globalArray.push(data.results.slice(0, 10));
    });
}

//Function to print movies-series into the web page
function showMovies(value, tittle) {
    //Navigate between the movies 10 to 10
    createRow(tittle);
    //Obtaining the images
    value.map(element => {
        createImg(tittle,element.poster_path, element.id, element.title);
    });
}

//Function to create the distinct sections tittle and containers of each section (popular, tendring, animes...)
function createRow(tittle) {
    //Creating the elements and setting the attributes
    const createH1 = document.createElement('h1');
    createH1.innerText = tittle;
    createH1.className = 'rowName';
    createH1.tabIndex = tittle; 
    const createRow = document.createElement('div');
    const createImgContainer = document.createElement('div');
    createImgContainer.className = 'col image-container';
    createImgContainer.id = tittle;
    createRow.className = 'row';
    //Introducing the elements into de global container
    container.appendChild(createH1);
    container.appendChild(createRow);
    createRow.appendChild(createImgContainer);
}

//Function to introduce the elements img elements into the sections
function createImg(title,imgRoute,imgId, imgTitle){

    const createImg = document.createElement('img');
    createImg.src = 'https://image.tmdb.org/t/p/w500'+imgRoute;
    createImg.alt = 'IMG';
    
    createImg.setAttribute('data-bs-toggle', 'modal');
    createImg.setAttribute('data-bs-target', '#myModal');
    createImg.className = 'imgEvent p-1';
    createImg.id = imgId;
    createImg.alt = imgTitle;
    createImg.tabIndex = imgTitle;
    createImg.setAttribute('width','10%');
    createImg.setAttribute('onclick', 'modalItems(this)');
    globalArray.push(createImg);
    //Introducing the img into the section container
    document.getElementById(title).appendChild(createImg);
}



//Function to add modals interface calling the api for a specific film...
function modalItems(movieId) {
    let value = movieId.id;

    //Calling the api for the requested film
    fetch('https://api.themoviedb.org/3/movie/'+value+'?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createModal();
        updateModalContent(data.title,data.overview,data.vote_average);
    });
    //Calling the api for the requested video
    fetch('https://api.themoviedb.org/3/movie/'+value+'/videos?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES')
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        //Checking that is an trailer for the movie
        if (data.results.length > 0) {
            //If we have a trailer we are going to take the last video (it´s usually the oficial trailer)
            let long = data.results.length -1 ;
            //Setting the iframe route
            updateIframeSrc(data.results[long].key);
        } else {
            //If we dont search a trailer we are going to put a generic video iframe
            updateIframeSrc('2YBtspm8j8M');
        }
    });
}

//Function to create the modal
function createModal(){
    //Creating the modal structure
    const modal = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalContentHeader = document.createElement('div');
    const modalContentBody = document.createElement('div');
    const buttonHeader = document.createElement('button');
    const iframeBody = document.createElement('iframe');
    const h1Body = document.createElement('h1');
    const pBody = document.createElement('p');
    const h4Body = document.createElement('h4');
    const favouriteButton = document.createElement('i');

    //Setting Parent modal 
    modal.className = 'modal fade modal-xl';
    modal.id = 'myModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby','exampleModalLabel');
    modal.setAttribute('aria-hidden','true');

    document.querySelector('#bodyContent').appendChild(modal);

    //Setting modalDialog
    modalDialog.className = 'modal-dialog';
    modal.appendChild(modalDialog);

    //Setting modalContent
    modalContent.className = 'modal-content';
    modalDialog.appendChild(modalContent);

    //Setting modalContentHeader
    modalContentHeader.className = 'modal-header';
    modalContent.appendChild(modalContentHeader);
    buttonHeader.className = 'btn-close';
    buttonHeader.setAttribute('data-bs-dismiss', 'modal');
    buttonHeader.setAttribute('aria-label', 'Close');
    buttonHeader.addEventListener('click', deleteModal );
    modalContentHeader.appendChild(buttonHeader);

    //Setting modalContentBody
    modalContentBody.className = 'modal-body';
    modalContent.appendChild(modalContentBody);
    //modalContentBody Iframe Settings
    iframeBody.width = '100%';
    iframeBody.height = '500';
    iframeBody.id = 'iframeModal';
    //iframe.src = 'https://www.youtube.com/embed/'+key;
    iframeBody.title = 'YouTube video player';
    iframeBody.src = '';
    iframeBody.setAttribute('frameborder', '0');
    iframeBody.setAttribute('allow', 'accelerometer', 'autoplay', 'clipboard-write', 'encrypted-media', 'gyroscope', 'picture-in-picture', 'web-share');
    iframeBody.setAttribute('allowfullscreen','1');
    modalContentBody.appendChild(iframeBody);
    //h1 p h4 modalContentBody settings
    h1Body.id = 'modalTitle';
    modalContentBody.appendChild(h1Body);
    pBody.id = 'modalDescription';
    modalContentBody.appendChild(pBody);
    h4Body.id = 'modalValoration';
    h4Body.className = 'btn btn-dark rounded-circle p-2';
    modalContentBody.appendChild(h4Body);
    //Favourite Button Settings
    favouriteButton.id = 'favouriteButton';
    favouriteButton.className = "mx-3 bi bi-heart";
    modalContentBody.appendChild(favouriteButton);
    //Adding the favourite modal event toggle with the cookie
    favouriteButton.addEventListener('click', function () {
        if (favouriteButton.className == "mx-3 bi bi-heart") {
            favouriteButton.className = "mx-3 bi bi-heart-fill";
            //Checking if the film is already in the favourite list
            if (favouriteArray.indexOf(h1Body.textContent) === -1) {
                favouriteArray.push(h1Body.textContent);
                console.log(favouriteArray);
                updateFavouriteList();
                //Setting the values to the cookie
                setCookie('cookieFavourites', JSON.stringify(favouriteArray), 9999);
                printFavouriteList (h1Body.textContent);
            }
        } else {
            favouriteButton.className = "mx-3 bi bi-heart";
            favouriteArray.splice((favouriteArray.indexOf(h1Body.textContent)), 1);
            console.log(favouriteArray);
            //Act the values to the cookie
            setCookie('cookieFavourites', JSON.stringify(favouriteArray), 9999);
            updateFavouriteList();
            deleteFavouriteList(h1Body.textContent);
        }
    });

}

//Function to update modal Iframe SRC
function updateIframeSrc(key) {
    let idIframe = document.querySelector('#iframeModal');
    idIframe.src = 'https://www.youtube.com/embed/'+key;
}
//Function to update modal content
function updateModalContent(title,description,valoration){
    document.querySelector('#modalTitle').innerHTML = title;
    document.querySelector('#modalDescription').innerHTML = description;
    document.querySelector('#modalValoration').innerHTML = +valoration.toFixed(2);
    let favouriteButtonArray = document.querySelector('#favouriteButton');
    if (favouriteArray.indexOf(title) == -1) {
        favouriteButtonArray.className = "mx-3 bi bi-heart";
    } else {
        favouriteButtonArray.className = "mx-3 bi bi-heart-fill";
    }
}
//Function to delete modal
function deleteModal(){
    let parentNode = document.querySelector('#myModal');       
    parentNode.remove();
}


//Adding the searchFilm event
let chatInput = document.querySelector('#searchFilm');

chatInput.addEventListener("blur", function() {
    container.style.display = 'block';
    getMovies('https://api.themoviedb.org/3/search/movie?api_key=dda4633aacd800647ce023600f1aae38&language=es-ES&query='+(chatInput.value)+'&include_adult=false', chatInput.value);

    /* IMPORTANTE HAGO UN EJEMPLO DE USO DE FILTER PARA FILTRAR LOS DATOS DESEADOS PERO ES MUCHO MAS SENCILLO DE IMPLEMENTAR EN MI CASO EL BUSCADOR QUE PROVEE LA API*/

    // Introducing the elements into the global container
    // container.style.display = "none";
    // const valueMap = {};
    // const searcher = globalArray.filter(element => {
    //     if (!element.alt.includes(chatInput.value)) {
    //       return false;
    //     } else {
    //       if (!valueMap[element.alt]) {
    //         valueMap[element.alt] = true;
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    // }).map(element => element.id);
    // searcher.forEach ( img => {
    //     console.log(img);
    //     img.style.display = 'block';
    // })
});
chatInput.addEventListener("input", function() {
    container.style.display = 'none';
});


//Function to create img with the title searched
function createImgSearch(route,id,title) {
    const imgFilmSearch = document.createElement('img');
    imgFilmSearch.src = 'https://image.tmdb.org/t/p/w500'+route;
    imgFilmSearch.id = id;
    imgFilmSearch.alt = title;
    imgFilmSearch.setAttribute('onclick', 'modalItems(this)');
}


//Event listener to return results
chatInput.addEventListener('blur', function () {
    container.style.display = 'block';
});

//Update favourite list
function updateFavouriteList () {
    let favouriteList = document.querySelector('#favouriteList');
    (favouriteArray == 0)? favouriteList.innerHTML = '': favouriteList.innerHTML = favouriteArray.length;
}

//Checking if the cookie is in use to update
if (getCookie('cookieFavourites') !== "") {
    //We update the cart value
    favouriteArray = JSON.parse(getCookie('cookieFavourites'));
    updateFavouriteList();
    //Setting the elements to the web page when we read the cookie
    let favouriteButton = document.querySelector('#menuFavourites');
    favouriteArray.forEach(element => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.id = element;
        li.textContent = element;
        favouriteButton.appendChild(li);
    });
} 

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

//SHOW THE ELEMENTS OF THE ARRAY IN THE WEB-PAGE
function printFavouriteList (element) {
    let favouriteButton = document.querySelector('#menuFavourites');
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.id = element;
    li.textContent = element;
    favouriteButton.appendChild(li);
}
//Function to delete elements from the list
function deleteFavouriteList (element) {
    document.getElementById(element).remove();
}


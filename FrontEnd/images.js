const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();


// Début création d'images à partir de l'API

function genererImages(x){

    for (let i = 0; i < x.length; i++){

    const article = x[i];

    const presentationVignette = document.querySelector(".gallery");

    const vignetteElement = document.createElement ("figure");

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;

    presentationVignette.appendChild(vignetteElement);
    vignetteElement.appendChild(imageElement);
    vignetteElement.appendChild(nomElement);

    }}


genererImages(works);



//Fin création d'images à partir de l'API


// Début Programmation Bouton


const boutonTous= document.querySelector(".btn-tous");

boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererImages(works);
});


const boutonObjets= document.querySelector(".btn-objets");

boutonObjets.addEventListener("click", function () {
    const objetsFiltres = works.filter(function(work) {
        return work.category.name === "Objets"
    });

    document.querySelector(".gallery").innerHTML = "";
    genererImages(objetsFiltres);
});

const boutonAppart= document.querySelector(".btn-appart");

boutonAppart.addEventListener("click", function () {
    const AppartFiltres = works.filter(function(work) {
        return work.category.name === "Appartements"
    });

    document.querySelector(".gallery").innerHTML = "";
    genererImages(AppartFiltres);
});



const boutonHotels= document.querySelector(".btn-hotels");

boutonHotels.addEventListener("click", function () {
    const HotelsFiltres = works.filter(function(work) {
        return work.category.name === "Hotels & restaurants"
    });

    document.querySelector(".gallery").innerHTML = "";
    genererImages(HotelsFiltres);
});



// Fin Programmation Boutons



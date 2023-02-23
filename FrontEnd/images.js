const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

console.log(works);

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
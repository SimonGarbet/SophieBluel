const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();
const reponse_2 = await fetch('http://localhost:5678/api/categories');
const categories = await reponse_2.json(); 



console.log(window.localStorage.getItem("clef"))
console.log(works);
console.log(categories);


// Partie Génération Images

function genererImages(works){

    for (const work of works){

    const presentationVignette = document.querySelector(".gallery");

    const vignetteElement = document.createElement ("figure");

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = work.title;

    presentationVignette.appendChild(vignetteElement);
    vignetteElement.appendChild(imageElement);
    vignetteElement.appendChild(nomElement);

    }}


genererImages(works);



// Partie Génération/Activation Filtres


function genererFiltres(works){


        const presentationFiltre = document.querySelector(".filtres")

        const filtreTous = document.createElement('button')
        filtreTous.innerText = "Tous"
        filtreTous.id = "Bouton_Tous"
        filtreTous.dataset.numero = '0'
        
        presentationFiltre.appendChild(filtreTous)

        
        console.log(filtreTous)


        
        let comparatif = []
       
       
    
        for (const work of works){

            if (comparatif.includes(work.categoryId) === false) {

           

            const filtreElement = document.createElement('button')
            filtreElement.innerText = work.category.name
            

            filtreElement.id = `Bouton_${work.categoryId}`
            filtreElement.dataset.numero = work.categoryId
            
            
            console.log(filtreElement)
            
            presentationFiltre.appendChild(filtreElement)

            comparatif.push(work.categoryId)
            }
        }
}



function activeFiltre(bouton){

    if (bouton.dataset.numero == 0){

        bouton.addEventListener("click", function() {
            document.querySelector(".gallery").innerHTML = "";
            genererImages(works)
          });


    } else {

    bouton.addEventListener("click",function(){
    const imagesFiltrees = works.filter(function(work){
        return work.category.id == bouton.dataset.numero
    })
    document.querySelector(".gallery").innerHTML = "";
    genererImages(imagesFiltrees)
    })
}
}




// Partie Admin


function createEditionMode (){
    const logo_edition = "<i class=\"fa-regular fa-pen-to-square\"></i>"
    const mode_edition = "<p>Mode édition</p>"
    const publierChange = "<button id=\"publier_changements\">publier les changements</button>"
    
    header_edition.innerHTML = logo_edition + mode_edition + publierChange

    modifPP.innerHTML = "<button id=\"bouton_modif_pp\"><i class=\"fa-regular fa-pen-to-square\"></i> modifier</button>"
    modifDesc.innerHTML =  "<button id=\"bouton_modif_description\"><i class=\"fa-regular fa-pen-to-square\"></i> modifier</button>"
    modifProj.innerHTML = "<button id=\"bouton_modif_projet\"><i class=\"fa-regular fa-pen-to-square\"></i> modifier</button>"
}





function switchAdmin () {

    if ( window.localStorage.getItem("clef") !== null){

        createEditionMode()
        
       login_logout.innerText = "logout"

       login_logout.addEventListener("click",function(){
        window.localStorage.removeItem("clef")
        switchAdmin()
    })

        
    } else {
    
        login_logout.innerText = "login"

        login_logout.addEventListener("click",function(){
            window.location.href= 'login.html'
        })
    
        genererFiltres(works);
        activeFiltre(Bouton_Tous)
        activeFiltre(Bouton_1)
        activeFiltre(Bouton_2)
        activeFiltre(Bouton_3)
    }
    
    }
    
    
     switchAdmin()




     

     // Partie Modale















        























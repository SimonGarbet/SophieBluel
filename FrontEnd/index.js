/* IMPORTANT
Pour pouvoir SUPPRIMER des images il y a deux étapes :
-> Appuyer sur la corbeille depuis la Galerie de la Modale
-> Appuyer sur Publier les Changements dans le bloc header d'édition

Pour ajouter des images il n'y a qu'une seule étape au moment de la soumission du formulaire dans la modale d'Ajout.
*/


let comparatifSuppr = []; 
// Tableau permattant le stockage des images supprimées pour pouvoir les prévisualiser avant de supprimer définitivement


const auth = JSON.parse(sessionStorage.getItem("clef"));
console.log(window.sessionStorage.getItem("clef"));



// Récupération des Données de l'API avec la génération de la page qui se fait dynamique ensuite

async function afficherPage () {

const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();
const reponse_2 = await fetch('http://localhost:5678/api/categories');
const categories = await reponse_2.json(); 

switchAdmin (works, categories)

}


afficherPage();



// Cette fonction fait portail d'entrée séparant visiteurs et administrateur 


function switchAdmin (works, categories) {

    if ( window.sessionStorage.getItem("clef") !== null){

        genererImages(works)

        createEditionMode()
        
       login_logout.innerText = "logout"

       imageSuppr()

       login_logout.addEventListener("click",function(){
        window.sessionStorage.removeItem("clef")
        document.querySelector(".gallery").innerHTML = "";
        switchAdmin(works, categories)
        })

        modifProj.addEventListener("click",function(){
            genererModaleGalerie (works, categories)
            genererImagesModale(works)
        })
        
    } else {

        genererImages(works)
    
        login_logout.innerText = "login"

        login_logout.addEventListener("click",function(){
            window.location.href= 'login.html'
        })
    
        genererFiltres(works);
        activeFiltre(Bouton_Tous, works)
        activeFiltre(Bouton_1, works)
        activeFiltre(Bouton_2, works)
        activeFiltre(Bouton_3, works)
        supprimerEditionMode()

    }
    
    }







// Generation des Images à partir des données works récupérées de l'API




function genererImages(works){

    for (const work of works){

        if (comparatifSuppr.includes(`${work.id}`)){

        }  else {

    const presentationVignette = document.querySelector(".gallery");

    const vignetteElement = document.createElement ("figure");

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = work.title;

    presentationVignette.appendChild(vignetteElement);
    vignetteElement.appendChild(imageElement);
    vignetteElement.appendChild(nomElement);

        }

    }}





// Génération des Filtres à partir des catégories renseignées depuis les works de l'API


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



// Activation des filtres



function activeFiltre(bouton, works){

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








// Génération et Suppression des blocs d'Administration (header d'édition, et boutons "modifier" ) en fonction d'Administrateur et Visiteur 


function createEditionMode (){

    header_edition.style.display = "flex"

    const logo_edition = "<i class=\"fa-regular fa-pen-to-square\"></i>"
    const mode_edition = "<p>Mode édition</p>"
    const publierChange = "<button id=\"publier_changements\">publier les changements</button>"

    en_tete.style.marginTop = "100px"
    
    header_edition.innerHTML = logo_edition + mode_edition + publierChange

    modifPP.innerHTML = "<button id=\"bouton_modif_pp\"><i class=\"fa-regular fa-pen-to-square\"></i> modifier</button>"
    modifDesc.innerHTML =  "<button id=\"bouton_modif_description\"><i class=\"fa-regular fa-pen-to-square\"></i> modifier</button>"
    modifProj.innerHTML = "<button id=\"bouton_modif_projet\"><i class=\"fa-regular fa-pen-to-square\"></i> modifier</button>"
}


function supprimerEditionMode () {
        header_edition.style.display = 'none'
        en_tete.style.marginTop = "50px"
        header_edition.innerHTML = ""
        modifPP.innerHTML = ""
        modifDesc.innerHTML =  ""
        modifProj.innerHTML = ""
}

    
    
   




     

     // Première Modale / Visualisation de la Galerie





    // Cette fonction génère la structure de la modale et récèptionne les addEventListeners

    function genererModaleGalerie (works, categories) {
        
        modalContainer.style.display = "flex"
        modal.style.display = "flex"
        modal.innerHTML = "<div class=\"div_closeModal\"><button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button></div>" 
        + "<h3>Galerie Photo</h3>" 
        + "<div class=\"presentation-images\"></div>" 
        + "<button id=\"ajoutPhoto\">Ajouter une photo</button>" 
        + "<button class=\"supprimer-galerie\">Supprimer la galerie</button>";

        closeModal.addEventListener("click", fermerModale)
        
        overlay_modal_trigger.addEventListener("click", fermerModale)

        ajoutPhoto.addEventListener("click", function() {
            genererModaleAjout(works, categories)
        })
               
    }

    // Cette fonction génère les images dynamiquement dans la modale à partir les données de l'API
    // Elle réceptionne les fonctions d'affichage du bouton pour bouger les projets et de prévisualisation de suppression


     function genererImagesModale(works){

        for (const work of works){

            if (comparatifSuppr.includes(`${work.id}`)){
    
            }  else {
    
        const presentationModale = document.querySelector(".presentation-images")
    
        const vignetteModale= document.createElement ("figure")

        const boutonMove = document.createElement("button")
        boutonMove.innerHTML = "<i class=\"fa-solid fa-arrows-up-down-left-right\"></i>"
        boutonMove.id = "boutonMove"
        boutonMove.dataset.idimage = work.id

        const boutonSuppr = document.createElement("button")
        boutonSuppr.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>"
        boutonSuppr.id = "boutonSuppr"
        boutonSuppr.dataset.idimage = work.id
    
        const imageModale= document.createElement("img")
        imageModale.src = work.imageUrl
        imageModale.id = "imageModale"
        imageModale.dataset.idimage = work.id
    
        const boutonEdit = document.createElement("button")
        boutonEdit.innerText = "éditer"
        boutonEdit.id="boutonEdit"

       
        
        
        presentationModale.appendChild(vignetteModale);
        vignetteModale.appendChild(boutonMove);
        vignetteModale.appendChild(boutonSuppr);
        vignetteModale.appendChild(imageModale);
        vignetteModale.appendChild(boutonEdit);

        

        affichageBoutonMove (imageModale, boutonMove, boutonSuppr)
        previsuSupprimer (boutonSuppr, imageModale, vignetteModale, works)

        }

    }
}



// Fonction explicite


    function fermerModale () {

            modalContainer.style.display = "none"
            modal.style.display = "none"
            modal.innerHTML = ""
            
    }

    


// Fonctions optionnelles sur lesquelles je me suis amusé à faire apparaitre le bouton déplacer au survol des images.



    function affichageBoutonMove (imageModale, boutonMove,boutonSuppr) {


        const zoneImage = [imageModale, boutonMove, boutonSuppr]

        zoneImage.forEach(function(elem){

            elem.addEventListener("mouseenter", function(){
                
            
                boutonMove.style.display = "block"
        })
    })



        imageModale.addEventListener("mouseout", function(){
                
                boutonMove.style.display = "none"
            
    
        })
}






    
    




// Seconde Modale / Ajout de Photo
    


// Cette fonction intègre la structure globale de la seconde modale, ainsi que les addEventListeners


function genererModaleAjout (works, categories) {
    modal.innerHTML = "<div class= \"boutons_top\">" 
    + "<button id=\"backModal\"><i class=\"fa-solid fa-arrow-left\"></i></button>"
    +"<button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button>" 
    + "</div>"
    + "<h3>Ajout Photo</h3>" 
    + "<div id=\"formulaireAjout\"></div>" ;

    closeModal.style.paddingLeft = "0"
    closeModal.style.paddingTop = "0"

    genererFormulaireAjout()
    genererCategorieAjout(categories)

    closeModal.addEventListener("click", fermerModale)

    backModal.addEventListener("click", function() {
        genererModaleGalerie (works, categories)
        genererImagesModale(works)
    })

    nouvelleImage.addEventListener('change', previewFile); 
    imageAdd (btnValider, upload, nouvelleImage, works, categories)
    
}



// Génération du formulaire Brut dans la structure de la seconde Modale


function genererFormulaireAjout () {
    formulaireAjout.innerHTML= "<form id=\"upload\">"
    + "<div id=\"partieImageAjout\">"
	+	"<i class=\"fa-regular fa-image\"></i>"
	+	"<input type=\"file\" id =\"nouvelleImage\" name =\"nouvelleImage\" accept=\".png, .jpeg, .jpg\" hidden>"
    +   "<label for = \"nouvelleImage\" class=\"decoFile\"> + Ajouter Photo </label>"
	+	"<p>jpg, png : 4mo max</p>"
	+    "</div>"

	+ "<div id = \"choixAjoutTitre\"><label for=\"nouveauTitre\">Titre</label>"
    + "<input type=\"text\" name=\"nouveauTitre\" id=\"nouveauTitre\"></div>"

	+ "<div id = \"choixAjoutCateg\">"  
    + "<label for=\"nouvelleCateg\">Categorie</label>"
    + "<select id=\"categoryPhoto\">"
    + "</div>"

    + "</form>"
}



// Génération dynamique du formulaire déroulant pour les catégories à partir de l'API


function genererCategorieAjout (categories) {

    for (const categorie of categories) {

    const choixCateg = document.createElement("option");
    choixCateg.value = categorie.id
    choixCateg.innerText = categorie.name;

    categoryPhoto.appendChild(choixCateg)
}

    const boutonValid = document.createElement("input")
    boutonValid.setAttribute('type', 'submit')
    boutonValid.setAttribute('value', 'Valider')
    boutonValid.setAttribute('id', 'btnValider')

    upload.appendChild(boutonValid)

    upload.style.display= "flex"
	upload.style.flexDirection= "column"
	upload.style.alignItems= "center"
	upload.style.gap= "20px"
    
}



// Les deux fonctions servent à limiter la taille de l'image de l'input file ainsi que de la prévisualisation de celle-ci


function previewFile () {

    if (this.files.length === 0) {
        return;
    }

    if (this.files[0].size > 4000000){
        alert('Image trop lourde, max 4Mo');
        return;
    }

    const file = this.files[0]

    const file_reader = new FileReader()

    file_reader.readAsDataURL(file);

    file_reader.addEventListener('load', (event) => displayImage(event))
    
}



function displayImage(event) {

    partieImageAjout.innerHTML=""

    const imageAjout = document.createElement("img")
    imageAjout.src = event.target.result;

    imageAjout.style.height = "200px"
    imageAjout.style.width = "70%"
    imageAjout.style.objectFit = "cover"

    partieImageAjout.style.padding = "0px 50px 0px 50px"


    partieImageAjout.appendChild(imageAjout)

}




    
     
     
// Permet d'avoir un visuel de la galerie et de l'index avec les projets supprimés 
// Avec possibilité de revenir en arrière en actualisant la page sans appuyer sur publier les changements




function previsuSupprimer (boutonSuppr, imageModale, vignetteModale, works) {

boutonSuppr.addEventListener("click", function(){


    const demandeSuppr = confirm("Voulez-vous supprimer cette image ? Cette opération n'est pas définitive, appuyer sur publier les changements pour confirmer vos suppressions.")

    if (demandeSuppr === true) {

    comparatifSuppr.push(imageModale.getAttribute("data-idimage"))

    console.log(comparatifSuppr)
    

    vignetteModale.style.display = "none"
    document.querySelector(".gallery").innerHTML = ""
    genererImages(works)
    }

})

}



// Suppression des images dans l'API


async function imageSuppr (){

    publier_changements.addEventListener("click", async function(event){
    event.preventDefault()

        console.log(comparatifSuppr)

        const demandeSuppr_2 = confirm("Cette action supprimera définitivement les images choisies précédemment, êtes vous sûr ?")

        if (demandeSuppr_2 === true) {

            let i = 0

            while (i <= (comparatifSuppr.length-1)){
            
                try {
                    const envoi_suppr = await fetch(`http://localhost:5678/api/works/${comparatifSuppr[i]}`, {

                    method: "DELETE",
                    headers: {
                        'Accept' : '*/*',
                        'Authorization' : `Bearer ${auth.token}`
                    },

                    

                    })

                    

                } catch (error) {
                    alert("Erreur")
                }
            
                i ++

            }

            comparatifSuppr = []
            fermerModale ();
            document.querySelector(".gallery").innerHTML = "";
            afficherPage();
            

        }



    })
}



// Ajout d'images dans l'API



async function imageAdd (btnValider, upload, nouvelleImage, works, categories) {

    btnValider.addEventListener("click", function(){

        const image_extension_regex = /\.(jpeg|jpg|png)$/i

        console.log(nouvelleImage.value)

        if ((!image_extension_regex.test(nouvelleImage.value)) || (nouvelleImage.size > 4000000)){
            alert("Le format d'image n'est pas approprié, veuillez selectionner un fichier jpg, jpeg ou png")
            genererModaleAjout(works, categories)

        } else if ( nouveauTitre.value === "" || nouvelleImage.value === "") {
                    alert("Veuillez remplir correctement le formulaire")
                    genererModaleAjout (works, categories)

        } else {
            
            

        const demandeAjout = confirm ("Voulez-vous ajouter cette image ?")

        if (demandeAjout === true) {

            upload.addEventListener("submit", async function(event){
            event.preventDefault()


            const chargeUtileImage = new FormData()
            chargeUtileImage.append('title', nouveauTitre.value)
            chargeUtileImage.append('image', nouvelleImage.files[0])
            chargeUtileImage.append('category', categoryPhoto.value)



                try {

                    const envoi_image = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        'Accept' : "application/json",
                        //'Content-type' : "multipart/form-data",
                        'Authorization' : `Bearer ${auth.token}`
                    },
                    body: chargeUtileImage
                    
                })

                
                



                } catch (error) {
                    alert("Erreur")
                }

            fermerModale ();
            document.querySelector(".gallery").innerHTML = "";
            afficherPage();
                
            })

        
        alert("Image bien reçue");
        
        }

        


    }

    })
}
    








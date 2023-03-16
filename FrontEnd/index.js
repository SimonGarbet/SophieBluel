async function afficherPage () {
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();
const reponse_2 = await fetch('http://localhost:5678/api/categories');
const categories = await reponse_2.json(); 




console.log(window.localStorage.getItem("clef"))
console.log(works);
console.log(categories);

const auth = JSON.parse(localStorage.getItem("clef"));

const comparatifSuppr = []


console.log(comparatifSuppr)


// Partie Génération Images

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
            console.log(comparatif)
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





function switchAdmin () {

    if ( window.localStorage.getItem("clef") !== null){

        createEditionMode()
        
       login_logout.innerText = "logout"

       imageSuppr()

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
        supprimerEditionMode()

    }
    
    }
    
    
     switchAdmin()




     

     // Partie Modale

    //Modale 1



     function genererImagesModale(){

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
        previsuSupprimer (boutonSuppr, imageModale, vignetteModale)

        }

    }
}



    function fermerModale () {

            modalContainer.style.display = "none"
            modal.style.display = "none"
            modal.innerHTML = ""
            
    }


     function genererModaleGalerie () {
        
        modalContainer.style.display = "flex"
        modal.style.display = "flex"
        modal.innerHTML = "<div class=\"div_closeModal\"><button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button></div>" 
        + "<h3>Galerie Photo</h3>" 
        + "<div class=\"presentation-images\"></div>" 
        + "<button id=\"ajoutPhoto\">Ajouter une photo</button>" 
        + "<button class=\"supprimer-galerie\">Supprimer la galerie</button>";

        closeModal.addEventListener("click", fermerModale)
        
        overlay_modal_trigger.addEventListener("click", fermerModale)

        ajoutPhoto.addEventListener("click", genererModaleAjout)

        
    }


    
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






    
    modifProj.addEventListener("click",function(){
        genererModaleGalerie ()
        genererImagesModale()
    })




// Modale 2
    



function genererModaleAjout () {
    modal.innerHTML = "<div class= \"boutons_top\">" 
    + "<button id=\"backModal\"><i class=\"fa-solid fa-arrow-left\"></i></button>"
    +"<button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button>" 
    + "</div>"
    + "<h3>Ajout Photo</h3>" 
    + "<div id=\"formulaireAjout\"></div>" ;

    closeModal.style.paddingLeft = "0"
    closeModal.style.paddingTop = "0"

    genererFormulaireAjout()
    genererCategorieAjout()

    closeModal.addEventListener("click", fermerModale)

    backModal.addEventListener("click", function() {
        genererModaleGalerie ()
        genererImagesModale()
    })

    nouvelleImage.addEventListener('change', previewFile); 
    imageAdd (btnValider, upload, nouvelleImage)
    
}



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


function genererCategorieAjout () {

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



// Prévisualisation Image Modale 2


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




    
     
     
// Suppression / Ajout d'Images   




function previsuSupprimer (boutonSuppr, imageModale, vignetteModale) {

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

            fermerModale ();
            document.querySelector(".gallery").innerHTML = "";
            afficherPage();    

        }



    })
}





async function imageAdd (btnValider, upload, nouvelleImage) {

    btnValider.addEventListener("click", function(){

        const image_extension_regex = /\.(jpeg|jpg|png)$/i

        console.log(nouvelleImage.value)

        if ((!image_extension_regex.test(nouvelleImage.value)) || (nouvelleImage.size > 4000000)){
            alert("Le format d'image n'est pas approprié, veuillez selectionner un fichier jpg, jpeg ou png")
            genererModaleAjout()

        } else if ( nouveauTitre.value === "" || nouvelleImage.value === "") {
                    alert("Veuillez remplir correctement le formulaire")
                    genererModaleAjout ()

        } else {
            
            

        const demandeAjout = confirm ("Voulez-vous ajouter cette photo ? Pour l'ajouter définitivement, appuyer sur publier les changements après cette opération")

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

                fermerModale ();
                document.querySelector(".gallery").innerHTML = "";
                afficherPage();
                



                } catch (error) {
                    alert("Erreur")
                }

                
            })

        
        alert("Image bien reçue");
        
        }

    }

    })
}
    



}


afficherPage();

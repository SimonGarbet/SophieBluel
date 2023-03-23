// Récupération des logs de l'utilisateur, stockage du token d'identification dans le Session Storage


async function seLogin () {

    const envoi_login = document.querySelector(".envoi_login")
    envoi_login.addEventListener("submit", async function (event){
    event.preventDefault()

    let identifiants = {
        email: event.target.querySelector("[name=emailco]").value,
        password: event.target.querySelector("[name=mdp]").value
    }

    const chargeUtile = JSON.stringify(identifiants)
    console.log(chargeUtile)

    try {

    const reponse_login = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile

        
    })

    console.log(reponse_login)
    const value = await reponse_login.json()


    if (reponse_login.status === 200){
        
        console.log(value)

        let clef = {
            userId: value.userId,
            token: value.token
        }
        window.sessionStorage.setItem("clef", JSON.stringify(clef))
        window.sessionStorage.setItem("userId", JSON.stringify(value.userId))

        console.log(window.sessionStorage.getItem("clef"))
        window.location.href= 'index.html'

    } else if (reponse_login.status === 401){
        alert("Mauvais mot de passe")
    } else if (reponse_login.status === 404){
        alert("L'utilisateur n'existe pas")
    }


    } catch (error) {
        alert("Erreur")
    }

    

    })

}

window.sessionStorage.removeItem("clef");

seLogin();

console.log(window.sessionStorage.getItem("clef"));





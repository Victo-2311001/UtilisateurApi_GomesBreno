//Infos pour créer l'utilisateur
const nom = document.getElementById("nom")
const prenom = document.getElementById("prenom")
const courriel = document.getElementById("courriel")
const motdepasse = document.getElementById("motdepasse")
const btnCreer = document.getElementById("btnCreer")

//Pour afficher des messages à l'utilisateur
const message = document.getElementById("message")

//Checkbox générer nouvelle clé
const checkNouvelleCle = document.getElementById("newkey");

btnCreer.addEventListener("click", () => {

    //Infos nécessaires pour creer l'utilisateur 
    const formData = {
       nom: nom.value,
       prenom: prenom.value,
       courriel: courriel.value,
       password: motdepasse.value
   };

   //Options pour fetch les créer l'utilisateur:
   const options = {
       method: "POST",
       headers: {
           'content-type': 'application/json'
       },
       body: JSON.stringify(formData)
   }

   //Url pour creer l'utilisateur
    let urlCreer = "http://127.0.0.1:3000/api/liste/utilisateur";

    if(nom.value == '' || prenom.value == '' || courriel.value == '' || motdepasse.value == ''){
        message.innerHTML = "Rentrez vous informations pour créer un utilisateur";
    }
    else{
        //Envoyer info api pour créer l'utilisateur
        fetch(urlCreer, options) 
        .then(response => response.json())
        .then(data => {
            if (data) {
                    message.innerHTML = "Utilisateur créé avec succès! Clé api =" + data.utilisateur.cle_api;
                    nom.value = "";
                    prenom.value = "";
                    courriel.value = "";
                    motdepasse.value = "";
            } else {
                console.error("Erreur avec l'API:", data.error_message);
            }
        })
        .catch(error => console.error("Erreur lors de la création:", error));
    }
})

//infos nécessaires pour récuperer la cle_api
const courrielGet = document.getElementById("courrielGet")
const motdepasseGet = document.getElementById("motdepasseGet")
const btnRecuperer = document.getElementById("btnRecuperer")

btnRecuperer.addEventListener("click", () => {

    //Infos nécessaires pour recuperer cle_api 
    const formData = {
       courriel: courrielGet.value,
       password: motdepasseGet.value
   };

   //Options pour fetch pour recuperer cle_api
   const options = {
       method: "POST",
       headers: {
           'content-type': 'application/json'
       },
       body: JSON.stringify(formData)
   }

   //Url pour recuperer cle_api
   let urlRecuperer = ""
   //Vérifier si la case régénérer cle_api est coché
   if(checkNouvelleCle.checked){
        urlRecuperer = "http://127.0.0.1:3000/api/liste/utilisateur/nouvellecle";
    } else{
        urlRecuperer = "http://127.0.0.1:3000/api/liste/utilisateur/cleapi";
    }

   //Envoyer info api pour recuperer cle_api
   fetch(urlRecuperer, options) 
   .then(response => response.json())
   .then(data => {
       if (data) {
        if(checkNouvelleCle.checked){
            alert("Nouvelle clé API: " + data.utilisateur.Nouvelle_cle_api);
        } else{
            alert("Clé API: " + data.utilisateur.cle_api);
        } 
            courrielGet.value = "";
            motdepasseGet.value = "";
       } else {
           console.error("Erreur avec l'API:", data.error_message);
           message.innerHTML = "Erreur: Impossible de récupérer la clé API";
       }
   })   
   .catch(error => console.error("Erreur lors de la récuperation de la cle_api:", error));
})




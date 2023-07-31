# P3Garbet : Sophie Bluel

### Réalisé par [Simon Garbet](https://www.simongarbet.com)
Dans le but d'un projet Openclassrooms

## Pour lancer ce site :

- cd P3Garbet/BackEnd
- npm start
- Double cliquez sur l'index dans le dossier FrontEnd

## Se connecter

E-mail : sophie.bluel@test.tld
MDP : S0phie

*(C'est bien un zéro sur le MDP)*


## Que fait ce site ?

Le site de Sophie Bluel est une reconstruction d'un portfolio d'une Designer d'Espace.
Nous avions toute la partie fixe qui était pré-programmée par Openclassrooms, ainsi que tout le backend et les routes API nous devions gérer toute la dynamique front de ce projet :

- La possibilité de filtrer les images en étant non connecté.
- La possibilité de se connecter.
- La possibilité d'ajouter/supprimer des images en étant connecté.
- L'ouverture d'une modale pour l'ajout/suppression d'images.

### Pour ajouter des images 

- Cliquez sur modifier à côté de Mes Projets en étant connecté.
- "Ajoutez une photo" sur la modale qui vient d'apparaitre.
- Remplir le formulaire.
- Appuyer sur valider va lancer la requête POST qui enverra le formulaire à l'API qui retournera la nouvelle image.

Publier les changements n'envoie pas de requête POST d'ajout de works.

### Pour pouvoir supprimer des images il y a deux étapes :

-> Appuyer sur la corbeille depuis la Galerie de la Modale
-> Appuyer sur Publier les Changements dans le bloc header d'édition (au dessus du header)

La corbeille n'envoit pas de requête DELETE, elle stocke simplement les images à supprimer dans un array.
Si vous souhaitez valider la suppresssion vous devez cliquer sur Publier les Changements qui enverra la requête DELETE à l'API.



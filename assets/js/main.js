// Importer les données des livres
import { livres } from './livres.js';
// Importer les Classes pour instancier les objets
import Livre from './Livre.js';
import Filtre from './Filtre.js';
import Panier from './Panier.js';

// Chargement initial des livres
window.addEventListener("load", function() {

    // Fonction pour afficher les livres dynamiquement
    function afficherLivres(livres) {
        contenuGlobal.innerHTML = ""; // Effacer le contenu précédent

        let index = -1;  // initialiser l'index pour que l'indice des tableaux commence à partir de 0
        livres.forEach(function(livre) {
            // instancier un nouveau objet Livre à chaque itération
            const livreObj = new Livre(livre.titre, livre.auteur, livre.description, livre.prix, livre.editeur, livre.pages, livre.image, livre.nouveaute, livre.categorie);
            //  incrémenter l'index pour garantir que chaque tuile de livre aura un indice unique.
            index++;    
            // Créer la tuile du livre avec la méthode creerTuileDeLivre()
            const tuileLivre = livreObj.creerTuileDeLivre(index);
            // afficher la tuile du livre généré dans le DOM.
            contenuGlobal.appendChild(tuileLivre);
        });
    }
    
    const contenuGlobal = document.querySelector(".main-content");
    const filtre = new Filtre();

    // Afficher les 12 premiers livres à l'ouverture de la page d'accueil
    afficherLivres(livres.slice(0, 12)); 
    // Préparer les livres affichés pour la afficher leurs détails dans la boite modale
    preparationModale(livres.slice(0, 12));  

    //preparationPanier(livres.slice(0, 12));
    
    // Sélection de tous les éléments avec la classe "filtre"
    const filtres = document.querySelectorAll(".filtre");

    // Boucle sur chaque élément de filtre
    filtres.forEach(function(filtreElement) {
        filtreElement.addEventListener("click", function(event) {
            // Récupérer le texte du filtre sélectionné
            const filtreSelectionne = event.target.textContent;

            // Appel de la méthode "setFiltre" pour définir le filtre actif
            filtre.setFiltre(filtreSelectionne);

            // Gestion de l'affichage des livres en fonction du filtre sélectionné
            if (filtreSelectionne === "Tous") {   // Afficher tous les livres                
                afficherLivres(livres);

                preparationModale(livres);  // Appel de la fonction pour la boite modale des livres
                preparationPanier(livres);  // Appel de la fonction pour le panier

            } else if (filtreSelectionne === "Nouveautés") {  // Afficeher les nouveautés               
                const nouveautes = livres.filter(function(livre) {
                    return livre.nouveaute === true;
                });               
                afficherLivres(nouveautes);
                preparationModale(nouveautes);

                preparationPanier(nouveautes);

            } else {
                // Filtrer les livres en fonction de la catégorie sélectionnée
                const livresFiltres = livres.filter(function(livre) {
                    return livre.categorie === filtreSelectionne;
                });
                afficherLivres(livresFiltres);
                preparationModale(livresFiltres);

                preparationPanier(livresFiltres);
                
            }
        });

    });
        
    // Fonction pour configurer la boîte modale en fonction des livres filtrés.
    function preparationModale(livreFiltre) {
        const tuileLivres = document.querySelectorAll('.livre-tuile');
        tuileLivres.forEach(function(tuileLivre) {
                const ajouterBouton = tuileLivre.querySelector('.ajouter-au-panier');
                // Gestionnaire d'événements sur le bouton "Ajouter"
                ajouterBouton.addEventListener('click', function(event) {
                // Empêcher la propagation de l'événement a la tuile
                event.stopPropagation();
                });
            tuileLivre.addEventListener('click', function() {
            // Obtenir l'indice du livre à partir de l'attribut dataset
                const indexLivre = tuileLivre.getAttribute('data-index');
                const livre1 = livreFiltre[indexLivre];

            // Instancier un nouveau objet pour chaque livre cliqué
            const livreClique = new Livre(livre1.titre, livre1.auteur, livre1.description, livre1.prix, livre1.editeur, livre1.pages, livre1.image, livre1.nouveaute, livre1.categorie);

            // Passer les détails du livre dans la boite modale
            livreClique.modalDetails();
            });
        });
    }

// Fonction pour gérer les boutons "Ajouter" au panier
function preparationPanier(livreFiltre) {
    // Instancier une objet panier
    const panier = new Panier();
    // Récupérer le compte du panier dans le header
    let nbrPanier = document.getElementById('cart-count').textContent;        

    // définir le compte du panier lors du chargement de la page
    panier.initialiseNbrPanier();

    const ajouterBoutons = document.querySelectorAll('.ajouter-au-panier');
    ajouterBoutons.forEach(function(ajouterBouton) {
        ajouterBouton.addEventListener('click', function() {
            // Obtenir l'indice du livre à partir de l'attribut dataset
            const indexLivre = ajouterBouton.getAttribute('data-index');
            // Récupérer les informations du livre
            const livre2 = livreFiltre[indexLivre];
        
            // Instancier un nouveau objet pour chaque livre cliqué
            const livreClique2 = new Livre(livre2.titre, livre2.auteur, livre2.description, livre2.prix, livre2.editeur, livre2.pages, livre2.image, livre2.nouveaute, livre2.categorie);

            
            ajouterAuPanier(livreClique2);
        });
    });
    
}

// Gestion de la petite boite modale pour afficher le panier
const boutonModalOuvrePanier = document.getElementById('cart');
boutonModalOuvrePanier.addEventListener('click', function() {

// Fonction pour afficher le contenu du panier dans la boite modale
function afficherContenuPanier() {
    // Obtenez le contenu actuel du panier à partir du localStorage
    const panier = JSON.parse(localStorage.getItem('panier')) || [];

    // Pointer su l'élement de la boite modale du panier
    const contenuPanierContainer = document.getElementById('cart-contents');

    // Effacer tout contenu existant
    contenuPanierContainer.innerHTML = '';

    // Initialiser le prix total
    let prixcTotal = 0;

// Remplir la table avec le contenu du panier et le prix total
    // Parcourir les livres dans le panier
    for (let i = 0; i < panier.length; i++) {
        const livre = panier[i];

        // Créer une nouvelle ligne pour chaque livre
        const rangee = document.createElement('tr');

        // Créer une cellule pour le titre du livre
        const titreCell = document.createElement('td');
        titreCell.textContent = livre.titre;

        // Créer une cellule pour le prix du livre
        const prixcell = document.createElement('td');
        prixcell.textContent = livre.prix + ' $';

        // Ajouter les cellules à la ligne
        rangee.appendChild(titreCell);
        rangee.appendChild(prixcell);

        // Ajouter la ligne au contenu du panier
        contenuPanierContainer.appendChild(rangee);

        // Mettre à jour le prix total
        prixcTotal += livre.prix;
    }

    // Afficher le prix total en bas de la table
    const rangeeTotal = document.createElement('tr');
    const cellTitreTotal = document.createElement('td');
    cellTitreTotal.textContent = 'Total';
    cellTitreTotal.setAttribute('colspan', 1);
    const cellValeurTotale = document.createElement('td');
    cellValeurTotale.textContent = prixcTotal + ' $';
    cellValeurTotale.style.fontWeight = 'bold';

    rangeeTotal.appendChild(cellTitreTotal);
    rangeeTotal.appendChild(cellValeurTotale);

    contenuPanierContainer.appendChild(rangeeTotal);
}

    // Fonction pour ouvrir la boite modale du panier
    function ouvrirModalPanier() {
        afficherContenuPanier();

        const modalPanier = document.getElementById('cart-modal');
        modalPanier.showModal();
    }

    // Ajouter event listener pour ouvrir la boite modale du panier
    const ouvrirModalPanierBtn = document.getElementById('cart');
    ouvrirModalPanierBtn.addEventListener('click', ouvrirModalPanier);


    // Afficher la boite modale
    const modalPanier = document.getElementById('cart-modal');
    modalPanier.showModal();
});

// Fermer la boite modale du panier
    const fermerModalPanierBtn = document.querySelector('.cart-modal-close');
    fermerModalPanierBtn.addEventListener('click', function() {
        const modalPanier = document.getElementById('cart-modal');
        modalPanier.close();
    });

});

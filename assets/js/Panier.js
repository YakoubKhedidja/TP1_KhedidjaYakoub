// panier.js

export default class Panier {
    // Tableau privé pour stocker les livres dans le panier
    #livresDansPanier; 

    constructor() {
        // Initialiser le panier comme un tableau vide        
        this.#livresDansPanier = JSON.parse(localStorage.getItem('this.#livresDansPanier')) || [];
    }

    // Méthode pour initialiser le compte du panier
    initialiseNbrPanier() {
        const panier = this.#livresDansPanier;
        let nbrPanier = panier.length;
        updateNbrPanier(nbrPanier);
    }
    // Méthode pour ajouter un livre au panier
    ajouterAuPanier(livre) {
        const infoLivre = {
            titre: livre.titre,
            prix: livre.prix,
            quantite: 1,
          };

        // Obtenir le contenu actuel du panier à partir du localStorage
        let panier = this.#chargerPanierDepuisLocalStorage();

        // Vérifier si le livre est déjà dans le panier 
         const livresDansPanier = panier.find(function(infoLivre) {
            return infoLivre.titre === livre.titre;
        });

          if (livresDansPanier) {
            // Si le livre est déjà dans le panier, incrémentez la propriété quantité
            livresDansPanier.quantite = (infoLivre.quantite || 1) + 1;
        } else {  
          // Ajouter le livre au tableau du panier
          this.panier.push(infoLivre);
          // Enregistre le panier dans le localStorage
          this.#sauvegarderPanierEnLocalStorage();
        }

        // mise à jour du conpte du panier
        let nbrPanier = panier.length;
        updateNbrPanier(nbrPanier);
    }


    // Méthode pour mettre à jour le compteur panier
    updateNbrPanier(nbrPanier) {
        const nbrPanierElement = document.getElementById('cart-count');
        nbrPanierElement.textContent = nbrPanier.toString();
    }

    // Méthode pour calculer le total du panier
    calculerTotal() {
        let total = 0;
        for (const livre of this.#livresDansPanier) {
            total += livre.prix;
        }
        return total;
    }

    // Méthode privée pour enregistrer le panier dans le localStorage
    #sauvegarderPanierEnLocalStorage() {
        localStorage.setItem("panier", JSON.stringify(this.#livresDansPanier));
    }

    // Méthode privée pour charger le panier depuis le localStorage
    #chargerPanierDepuisLocalStorage() {
        const panierEnLocalStorage = localStorage.getItem("panier");
        if (panierEnLocalStorage) {
            this.#livresDansPanier = JSON.parse(panierEnLocalStorage);
        }
    }
}


    


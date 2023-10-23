// Definir la classe Livre
export default class Livre {
    constructor(titre, auteur, description, prix, editeur, pages, image, nouveaute, categorie) {
        this.titre = titre;
        this.auteur = auteur;
        this.description = description;
        this.prix = prix;
        this.editeur = editeur;
        this.pages = pages;
        this.image = image;
        this.nouveaute = nouveaute;
        this.categorie = categorie;
    }

    creerTuileDeLivre(index) {
        // Créer un élément div pour la tuile du livre
        const tuileLivre = document.createElement('div');
        // Ajouter une classe pour la tuile et une autre pour le boutton
        tuileLivre.classList.add('livre-tuile'); 
        tuileLivre.classList.add("btn-ouvrir");
        
        // Injecter l'indice du livre en tant que dataset
        tuileLivre.dataset.index = index;

        // Créez un lien <a href> autour de la tuile du livre
        const lienLivre = document.createElement("a");
        lienLivre.href = "#"; 

        // Ajoutez le contenu de la tuile à l'intérieur du lien
        lienLivre.innerHTML = `
            <img src="${this.image}" alt="${this.titre}">
            <div class="tuile-contenu">
                <h2>${this.titre}</h2>
                <p>${this.prix} $</p>
                <button class="ajouter-au-panier">Ajouter</button>
            </div>
        `;

        // Ajoutez le lien à la tuile de livre
        tuileLivre.appendChild(lienLivre);
        return tuileLivre;
    }
    

    modalDetails() {
        // Pointer les éléments à l'intérieur de la boite modale
        const modalImage = document.getElementById('modal-image');
        const modalTitre = document.getElementById('modal-titre');
        const modalAuteur = document.getElementById('modal-auteur');
        const modalEditeur = document.getElementById('modal-editeur');
        const modalPages = document.getElementById('modal-pages');
        const modalDescription = document.getElementById('modal-description');
    
        // Remplir les éléments avec les détails du livre
        modalImage.src = this.image;
        modalImage.alt = this.titre;
        modalTitre.textContent = this.titre;
        modalAuteur.textContent = this.auteur;
        modalEditeur.textContent = this.editeur;
        modalPages.textContent = this.pages;
        modalDescription.textContent = this.description;
    
        // Afficher la boite modale
        const modal = document.getElementById('modal');
        modal.showModal();
        
        // Fermer la boite modale
        const modalCloseButton = document.getElementById('modal-close');
        modalCloseButton.addEventListener('click', () => {
            modal.close();
        });
    }
    
};


// Filtre.js
export default class Filtre {
    #filtreActif;
    
    constructor() {
        // Initialisation des filtres
        this.#filtreActif = "Accueil"; // Filtre par défaut
    }

    // Méthode pour définir le filtre actif
    setFiltre(filtre) {
        this.#filtreActif = filtre;
    }

    // Méthode pour obtenir le filtre actif
    #getFiltreActif() {
        return this.#filtreActif;
    }
}

# Noël Prestige

Boutique de **cadeaux d'exception**, en français.
Site statique, **fichier HTML unique**, sans aucune dépendance externe.

Thème sombre, or & noir. Édition limitée 2026. Livraison offerte dès 50 000 FCFA.

## Démarrage

Ouvrir directement `index.html` dans un navigateur, ou servir le dossier :

```bash
python -m http.server 8000
# http://localhost:8000/
```

## Fonctionnalités

- **Catalogue piloté par les données** — le tableau `CATALOG` alimente les cartes,
  les fiches produit, les filtres et le panier.
- **Illustrations SVG** intégrées en ligne (aucun appel réseau), dessinées en thème or/sombre.
- **Recherche** insensible aux accents, filtres promo / bestseller / favoris, tri par prix.
- **Sélecteur de cadeau** : destinataire + budget.
- **Fiche produit** : caractéristiques, quantité, avis, « souvent achetés ensemble ».
- **Avis clients** avec note par étoiles et photo compressée côté client.
- **Wishlist** (cœur) persistante.
- **Panier** persistant : quantités, suppression, barre de progression vers la livraison offerte.
- **Codes promo** : `NOEL15` (−15 %) et `PRESTIGE10` (−10 %). La newsletter applique
  automatiquement `NOEL15` au panier.
- **Checkout** en deux étapes : récapitulatif puis formulaire, confirmation avec référence `NP-XXXXXX`.
- **Compte à rebours** jusqu'au 25 décembre.
- **Mentions légales** en 5 onglets : mentions légales, CGV, confidentialité, cookies, contact.
- **SEO** : meta description, Open Graph, Twitter card, favicon SVG, JSON-LD `OnlineStore`.

## Structure

```
index.html
├── <style>    thème, composants, responsive
└── <script>   ART → CATALOG → API → rendu → filtres → panier → checkout
```

## Persistance

| Clé | Contenu |
|---|---|
| `noel-prestige-cart` | Panier |
| `noel-prestige-wishlist` | Favoris |
| `noel-prestige-reviews` | Avis publiés |
| `noel-prestige-orders` | Commandes |
| `noel-prestige-newsletter` | Inscription newsletter |

## Backend

`API` est une couche d'abstraction prête à être branchée sur un vrai serveur
(endpoint cible : `/api/orders`). Remplacez le corps de ses cinq méthodes par
des appels `fetch()` ; le reste du front n'a pas à changer.

## Accessibilité

Navigation clavier complète, piège de focus dans les modales, `Échap` ferme la
couche supérieure, attributs `aria`, et respect de `prefers-reduced-motion`.

## Contenu

Produits, avis et coordonnées sont **fictifs**, fournis à titre de démonstration.

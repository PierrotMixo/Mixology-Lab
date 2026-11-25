# MIXOLOGY LAB — Personal Edition V2

Application web progressive (PWA) de mixologie, conçue pour un usage personnel derrière le bar.

## Fonctionnalités incluses
- Générateur local de 5 propositions cocktail/mocktail.
- Choix du type, du profil aromatique et de l'intensité.
- Bibliothèque initiale de classiques et de recettes sans alcool.
- Fiches techniques : ingrédients, dosages, méthode, verrerie, garniture et notes.
- Favoris enregistrés dans le stockage local du navigateur.
- Nouvel espace « Mon Bar » : inventaire personnel de bouteilles, spiritueux, liqueurs, sirops, jus et softs.
- Ajout manuel avec marque, référence, catégorie, degré, contenance et notes aromatiques.
- Ajout d’une photo d’étiquette comme aide visuelle et référence locale.
- Suppression des produits et génération de pistes de cocktails à partir des produits enregistrés.
- Aucune gestion des quantités restantes ; inventaire conservé localement sur l’appareil.
- Interface responsive mobile / ordinateur.
- Manifest PWA et service worker pour mise en cache de base.

## Prérequis
- Node.js 20 ou supérieur recommandé.
- npm.

## Démarrer en local
```bash
npm install
npm run dev
```
Ouvrir l'adresse affichée par Vite (souvent http://localhost:5173).

## Construire la version de production
```bash
npm run build
npm run preview
```
Le dossier `dist/` contient les fichiers à héberger en HTTPS.

## Installer sur Android
1. Héberger le dossier `dist/` sur un hébergement HTTPS.
2. Ouvrir l'adresse dans Chrome sur Android.
3. Menu ⋮ > Installer l'application (ou Ajouter à l'écran d'accueil selon la version).
4. L'application apparaît ensuite comme une icône.

## Installer sur iPhone
1. Ouvrir l'adresse HTTPS dans Safari.
2. Partager > Sur l'écran d'accueil.
3. Confirmer l'ajout.

## Limites connues de cette V2
- Le générateur est un prototype déterministe à règles simples, pas une IA générative. Il propose des structures de recettes à tester et valider.
- Le champ « ingrédients à explorer » est préparé dans l'interface, mais n'est pas encore utilisé dans l'algorithme.
- La bibliothèque est une sélection initiale, pas un catalogue exhaustif ni une reproduction certifiée des fiches IBA.
- Les recettes générées doivent être dégustées, équilibrées et validées avant tout service.
- Les favoris sont stockés sur l'appareil et ne sont pas synchronisés entre plusieurs appareils.
- Le mode hors ligne dépend de la première visite et des ressources mises en cache. Pour un usage hors ligne robuste, prévoir un test après déploiement.

## Limites et prochaines améliorations
1. Reconnaissance automatique des étiquettes par un service OCR / IA sécurisé.
2. Moteur de création réellement piloté par les ingrédients disponibles et les contraintes de texture.
2. Base de données enrichie et vérifiée des cocktails classiques.
3. Éditeur de recettes personnelles et export PDF.
4. Calcul du degré alcoolique estimé après dilution.
5. Sauvegarde / restauration des données.
6. Option de connexion à une API IA, avec clé sécurisée côté serveur.

# Alexis Reading — Prototype V1

Application d'apprentissage de la lecture **bilingue français / anglais**.
Prototype interactif, entièrement cliquable.

---

## Contenu de ce dossier

```
index.html      <- le point d'entree
.nojekyll       <- necessaire a GitHub Pages, a ne pas supprimer
assets/         icones (les illustrations arrivent en V2)
css/            l'apparence
data/           tout le contenu pedagogique
js/             le fonctionnement
```

Rien à installer, rien à lancer. `index.html` fonctionne seul.

---

## Voir tout le parcours

Au premier lancement, Alexis démarre à zéro : 39 compétences sur 42 sont
verrouillées. C'est voulu — mais pour explorer les mondes avancés, les livres
et les récompenses tout de suite :

**Espace parent** (bas de l'accueil) → petit calcul →
onglet **Réglages** → **Charger une progression de démonstration**.

Le bouton **Tout remettre à zéro**, juste en dessous, ramène à l'état de départ
pour tester le vrai premier lancement d'Alexis.

---

## Mettez le son

L'audio n'est pas un ornement : à cet âge, un enfant apprend par l'oreille.

Vérifiez dans **Espace parent → Réglages** qu'une voix française **et** une voix
anglaise sont disponibles. S'il manque l'anglaise, l'application se tait et vous
prévient — elle ne prononcera jamais l'anglais avec une voix française.

- **iOS** : Réglages → Accessibilité → Contenus vocaux → Voix → English
- **Android** : Paramètres → Général → Synthèse vocale
- **Chrome ou Edge sur ordinateur** : les voix sont déjà là

---

## Ce que contient la V1

**Côté enfant** — accueil avec langue du jour, carte d'aventure de dix mondes,
séances françaises et anglaises, 19 mécaniques d'exercice, bibliothèque,
6 livres, récompenses et trophées.

**Côté parent** — vue d'ensemble, progression française, progression anglaise,
compétences triées par priorité de travail, planning bilingue modifiable,
réglages.

**Deux programmes réellement distincts** — 42 compétences françaises,
37 compétences anglaises. Le CH se dit chhh en français (chat) et tch en
anglais (chip). Ce ne sont pas deux versions du même parcours.

---

## Limites assumées de cette V1

- Voix de synthèse, pas de voix humaine enregistrée
- Emoji en guise d'illustrations
- Un seul profil enfant, mémorisé dans le navigateur
- Mondes 8 à 10 fonctionnels mais peu fournis en contenu

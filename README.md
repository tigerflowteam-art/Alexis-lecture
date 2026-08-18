# Alexis Reading — Prototype V2

Application d'apprentissage de la lecture **bilingue français / anglais**,
organisée en **missions**.

Une mission = une compétence = une séquence complète de 10 activités :
découverte → pratique → décodage → compréhension → lecture → récompense.
Comptez 8 à 15 minutes.

---

## Contenu du dossier

```
index.html      le point d'entrée
.nojekyll       nécessaire à GitHub Pages
assets/         icônes, et le dossier audio à remplir (voir MANIFEST.md)
css/            l'apparence
data/           tout le contenu pédagogique
js/             le fonctionnement
```

Rien à installer, rien à lancer.

---

## Ce qui change depuis la V1

**Les missions.** Le cœur du produit n'est plus une séance de 5 exercices
mais une mission structurée. 5 missions françaises et 5 anglaises sont
entièrement jouables, avec 95 activités au total.

**20 mécaniques différentes** — écouter, choisir, trouver, trier, attraper,
mémoriser, associer, fusionner, construire, segmenter, lire à voix haute,
comprendre, suivre une consigne, lire une mini-histoire. Une même compétence
est travaillée sous plusieurs formes, jamais dix fois de la même façon.

**Localisation stricte.** Journée française → toute l'interface enfant est
française. Journée anglaise → tout est anglais. Plus un seul « MY BOOK » au
milieu du français.

**Architecture audio.** L'application demande une *clé* audio, jamais
directement la synthèse. Elle cherche un enregistrement dans `assets/audio`,
et ne bascule sur la synthèse qu'à défaut. Voir `assets/audio/MANIFEST.md`.

**Étayage sur erreur.** Après deux essais infructueux sur une fusion ou une
construction, l'application ne repropose pas le même obstacle : elle
redescend la marche — LAMA → LA → MA → LAMA — puis remonte.

**Deux vrais livres.** `Mama et le lama` et `Sam in the pit`, six pages
chacun, **intégralement déchiffrables** avec les seuls sons enseignés dans
les missions 1 à 5. Vérifié lettre par lettre par les tests.

**Récompenses liées aux accomplissements.** Premier son maîtrisé, première
fusion réussie, premier mot lu, premier livre terminé. Aucun coffre aléatoire.

---

## Voir tout le parcours

Au premier lancement, seule la mission 1 est ouverte. Pour explorer :

**Espace parent** (bas de l'accueil) → petit calcul → **Réglages** →
**Charger une progression de démonstration**.

---

## Mettez le son

**Espace parent → Réglages** vérifie qu'une voix française **et** une voix
anglaise existent. Sans voix anglaise, les missions anglaises restent
muettes : l'application ne prononcera jamais l'anglais avec une voix
française.

La synthèse vocale reste un pis-aller. Elle sert à valider le parcours,
pas à apprendre la prononciation — un enfant imite exactement ce qu'il
entend, défauts compris.

---

## Les deux progressions

Elles sont indépendantes, pas traduites l'une de l'autre.

| | Français | English |
|---|---|---|
| M1 | J'écoute | I listen |
| M2 | Le son M | The sound S |
| M3 | Le son A | The sound A |
| M4 | Je colle M et A | Blending (T, P) |
| M5 | Le son L · LAMA | First words (I, N, M) |
| Premier livre | Mama et le lama | Sam in the pit |

Le CH fait /ʃ/ en français (chat) et /tʃ/ en anglais (chip). Le A français
n'est pas le A anglais. Ce sont deux systèmes.

---

## Tests

```bash
node tools/test-v2.js            # parcours cliqué complet
node tools/build-standalone.js   # fabrique dist/
```

Ce que le test vérifie réellement :

```
95 activités réparties sur 10 missions jouables
livres 100 % déchiffrables, vérifiés lettre par lettre
localisation stricte : aucun mot anglais en journée française
9 missions traversées de bout en bout jusqu'à l'écran de fin
déblocage des livres, trophées, album
6 onglets parents, lecteur de livre, 15 missions sur la carte
phonèmes : le son, jamais le nom de la lettre
```

---

## Limites assumées

- Voix de synthèse en attendant les enregistrements
- Emoji en guise d'illustrations
- Missions 6 et suivantes annoncées mais pas encore jouables
- Un seul profil enfant, en mémoire du navigateur
- Lecture à voix haute simulée : pas encore de reconnaissance vocale

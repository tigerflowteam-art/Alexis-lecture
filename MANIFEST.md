# assets/audio — Ce qu'il faut enregistrer

L'application cherche **d'abord** un fichier ici. Elle ne bascule sur la
synthèse vocale que s'il n'y en a pas. Déposer les fichiers suffit :
aucune ligne de code à modifier.

## Convention de nommage

```
assets/audio/<langue>/<type>/<nom>.mp3
```

| Clé dans le code | Fichier attendu |
|---|---|
| `fr:phoneme:m` | `assets/audio/fr/phoneme/m.mp3` |
| `fr:word:lama` | `assets/audio/fr/word/lama.mp3` |
| `fr:syll:ma`   | `assets/audio/fr/syll/ma.mp3` |
| `fr:ui:bravo`  | `assets/audio/fr/ui/bravo.mp3` |
| `en:phoneme:s` | `assets/audio/en/phoneme/s.mp3` |

## Priorité 1 — les phonèmes

**On enregistre LE SON, jamais le nom de la lettre.**

| Fichier | Ce qu'on dit | Ce qu'on ne dit PAS |
|---|---|---|
| `fr/phoneme/m.mp3` | mmmmm (tenu ~1 s) | « emme » |
| `fr/phoneme/s.mp3` | sssss | « esse » |
| `fr/phoneme/t.mp3` | te (bref, sans « eu » appuyé) | « té » |
| `fr/phoneme/a.mp3` | aaaaa, bouche ouverte | « a » nom de lettre |
| `en/phoneme/s.mp3` | sss | « ess » |
| `en/phoneme/a.mp3` | ah (court, anglais) | le A français |
| `en/phoneme/t.mp3` | tuh (très bref) | « tee » |

Les occlusives (t, p, d, b, k) doivent être **le plus brèves possible** :
un « peuh » appuyé fabrique une syllabe parasite et gêne la fusion.

## Priorité 2

Les mots des missions 1 à 5, puis les syllabes, puis les consignes,
puis les phrases des livres.

## Deux voix distinctes

Une locutrice française, un locuteur natif anglais. Ne jamais faire lire
l'anglais par la voix française : c'est précisément ce que le code refuse
de faire avec la synthèse, et ce serait absurde de le contourner avec des
enregistrements.

## Format

MP3, mono, 44,1 kHz, ~128 kb/s. Silence de tête coupé net : l'enfant
touche le bouton et le son doit partir immédiatement.

## Vérifier

Espace parent → Réglages → la ligne « Enregistrements détectés » passe à
« oui » dès qu'un fichier est trouvé.

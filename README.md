## L'architecture du projet :

Ce projet, contient un projet et deux sous-projet
```
bill-app/
   - Billed-app-FR-Back
   - Billed-app-FR-Front
```
## Installation :

Les deux sous-projets peuvent être installés depuis la racine en effectuant la commande:
```
$ npm run install-all
```
## Comment lancer l'application en local ?

Pour lancer simultanément le backend et le frontend depuis la racine en effectuant la commande:
```
$ npm start
```
Puis aller sur le lien:
```
http://127.0.0.1:8080/
```
## Comment lancer tous les tests ?

Tous les tests du frontend peuvent être lancés depuis la racine en effectuant la commande:
```
$ npm run front-test
```
## Comment lancer un seul test ?
```
$ jest src/__tests__/your_test_file.js
```
## Comment voir la couverture de test ?
```
`http://127.0.0.1:8080/coverage/lcov-report/`
```
## Comptes et utilisateurs :

Vous pouvez vous connecter en utilisant les comptes:

### administrateur : 
```
utilisateur : admin@test.tld 
mot de passe : admin
```
### employé :
```
utilisateur : employee@test.tld
mot de passe : employee
```

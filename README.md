# mrx-test - Technical test

L'objectif de ce test est de mettre en place un backend et un frontend déployés sur un serveur distant 

<br />

> Comment utiliser le code

**Étape #1** - Cloner le code source

```bash
$ git clone https://github.com/DamienMonchaty/mrxsys-app.git
$ cd mrxsys-app
```

<br />

**Étape #2** - Installer les modules avec NPM ou Yarn

```bash
$ npm install
// OR
$ yarn
```

<br />

**Étape #3** - Démarrer le projet (mode développement)

```bash
$ npm run dev
// OR
$ yarn dev
```

<br />

## Docker Deployment Script

Ce script facilite le déploiement d'images Docker sur un serveur distant en utilisant SSH.

### Prérequis

- Docker installé localement.
- Le package `sshpass` installé (`sudo apt install sshpass`).

### Utilisation

1. Configurez les variables dans le script en fonction de votre environnement :

    - `ARCHIVE` : Nom du fichier d'archive pour exporter/importer les images Docker.
    - `IMAGE` : Image Docker à exporter/importer.
    - `SSH_HOST` : Nom d'hôte ou adresse IP du serveur distant.
    - `SSH_LOGIN` : Nom d'utilisateur SSH.
    - `SSH_PASSWORD` : Mot de passe SSH.
    - `SSH_PORT` : Numéro de port SSH.
    - `SSH_DIRECTORY_TARGET` : Répertoire cible sur le serveur distant.

2. Exécutez le script avec l'argument approprié :

    - `export` : Exportez l'image Docker et déployez-la sur le serveur distant.
    - `import` : Importez l'image Docker sur le serveur distant.
    - `start` : Démarrez les conteneurs Docker sur le serveur distant.

### Exemples de commandes

1. Exportez l'image Docker et déployez-la sur le serveur distant :

    ```bash
    ./deploy.sh export
    ```

2. Importez l'image Docker sur le serveur distant :

    ```bash
    ./deploy.sh import
    ```

3. Démarrez les conteneurs Docker sur le serveur distant :

    ```bash
    ./deploy.sh start
    ```


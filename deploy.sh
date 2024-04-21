#!/bin/bash

ARCHIVE=mrxsys.tar.gz
IMAGE=dammonchaty/app-web:2.0

SSH_HOST=recrutement.mrxsys.com
SSH_LOGIN=mrxsys
SSH_PASSWORD=RecrutementMRX-Damien
SSH_PORT=100

SSH_DIRECTORY_TARGET=/home/mrxsys

if [[ $1 = "export" ]]
then
    echo "Suppression de l'archive ..."
    rm -f $ARCHIVE 2> /dev/null

    echo "Exporter l'image $IMAGE dans l'archive $ARCHIVE ..."
    docker save $IMAGE | gzip > $ARCHIVE 

    echo "Envoie de l'archive $ARCHIVE ..."
    sshpass -p $SSH_PASSWORD scp -P $SSH_PORT $ARCHIVE $SSH_LOGIN@$SSH_HOST:$SSH_DIRECTORY_TARGET

elif [[ $1 = "import" ]]
then
    echo "Stop docker compose and remove containers from old image..."
    sshpass -p $SSH_PASSWORD ssh -p $SSH_PORT $SSH_LOGIN@$SSH_HOST "docker compose down"

    echo "See images in local registry before remove old image..."
    sshpass -p $SSH_PASSWORD ssh -p $SSH_PORT $SSH_LOGIN@$SSH_HOST "docker images"
    echo "Remove old images ..."
    sshpass -p $SSH_PASSWORD ssh -p $SSH_PORT $SSH_LOGIN@$SSH_HOST "docker rmi $IMAGE"
    echo "See images in local registry after remove old image..."
    sshpass -p $SSH_PASSWORD ssh -p $SSH_PORT $SSH_LOGIN@$SSH_HOST "docker images"    

    echo "Load archive on image remotely ..."
    sshpass -p $SSH_PASSWORD ssh -p $SSH_PORT $SSH_LOGIN@$SSH_HOST "docker load < $ARCHIVE"
    echo "See images in local registry after load archive..."
    sshpass -p $SSH_PASSWORD ssh -p $SSH_PORT $SSH_LOGIN@$SSH_HOST "docker images"

elif [[ $1 = "start" ]]
then
    echo "Envoie du fichier docker-compose.yml ..."
    sshpass -p $SSH_PASSWORD scp -P $SSH_PORT docker-compose.yml $SSH_LOGIN@$SSH_HOST:$SSH_DIRECTORY_TARGET

    sshpass -p $SSH_PASSWORD ssh -p $SSH_PORT $SSH_LOGIN@$SSH_HOST "docker compose up -d"
else
    echo "no argument found"
fi

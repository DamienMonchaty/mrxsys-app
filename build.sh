#!/bin/bash

#docker buildx build -t mrxsys/app-web:1.0 --platform linux/arm64 .

docker buildx build -t dammonchaty/app-web:1.0 --platform linux/arm64 .


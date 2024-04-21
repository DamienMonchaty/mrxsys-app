# set the base image to create the image for react app
#https://hub.docker.com/_/node
# Supported Architecture : amd64, arm32v6, arm32v7 (Raspberry 32bits), arm64v8 (Raspberry 64bits), ppc64le, s390x
FROM node:20-alpine

# create a user with permissions to run the app
RUN addgroup app && adduser -S -G app app

# set the user to run the app
USER app

# set the working directory to /app
WORKDIR /app

# create a directory for the app user
# RUN mkdir -p /home/app && chown -R app:app /home/app && chmod -R u+rwx /home/app

# copy package.json and package-lock.json to the working directory
# This is done before copying the rest of the files to take advantage of Docker’s cache
# If the package.json and package-lock.json files haven’t changed, Docker will use the cached dependencies
COPY package*.json ./
COPY ./prisma prisma
COPY ./prisma/database.db /app/database.db

# sometimes the ownership of the files in the working directory is changed to root
# and thus the app can't access the files and throws an error -> EACCES: permission denied
# to avoid this, change the ownership of the files to the root user
USER root

# Ensure write permissions for the app directory and its contents
RUN chmod -R u+w .

# change the ownership of the /app directory to the app user
RUN chown -R app:app .

# As root, change the ownership of dev.db to app user
RUN chown app:app database.db

# change the user back to the app user
USER app

# init prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# install dependencies
RUN npm install

# copy the rest of the files to the working directory
COPY . .

# expose port 3000 to tell Docker that the container listens on the specified network ports at runtime
EXPOSE 3000

# command to run the app
CMD npm run dev

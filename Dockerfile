# syntax=docker/dockerfile:

# specify a base image
FROM node:14.17.1

# specify a working directory
WORKDIR /app

# copy package.json and package-lock.json for dependency install
COPY package.json package.json
COPY package-lock.json package-lock.json

# install dependencies
RUN npm i

# copy over the rest of the files
COPY . .

# run command
CMD ["npm", "start"]
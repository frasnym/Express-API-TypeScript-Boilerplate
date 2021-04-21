FROM node:14.16.0-alpine3.10
RUN mkdir -p /usr/src/node-app
WORKDIR /usr/src/node-app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000

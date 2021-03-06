FROM node:14-alpine3.13
RUN mkdir -p /usr/src/node-app

# Set Timezone
ARG TZ
RUN apk add tzdata 
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime

WORKDIR /usr/src/node-app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000

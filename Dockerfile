FROM node:16-alpine as juegathon
LABEL maintainer="tonymtz <hello@tonymtz.com>"
WORKDIR /usr/src/app
COPY package*.json ./
ARG PORT=$PORT
ENV NODE_ENV=production
RUN npm install
RUN npm run build
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "start" ]

FROM node:16-alpine as juegathon
LABEL maintainer="tonymtz <hello@tonymtz.com>"
WORKDIR /usr/src/app
COPY . .
ARG PORT=$PORT
RUN npm install
RUN npm run build
EXPOSE ${PORT}
CMD [ "npm", "start" ]

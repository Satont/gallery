FROM node:14.15.0-alpine

RUN apk add --no-cache bash

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm start

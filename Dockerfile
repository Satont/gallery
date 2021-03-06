FROM node:15-alpine

RUN apk add --no-cache bash

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm start

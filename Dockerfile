FROM node:14.15.0-alpine3.12

WORKDIR '/usr/src/app/src'

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
FROM node:20.10.0-slim

USER node

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4200

CMD ["yarn", "start"]

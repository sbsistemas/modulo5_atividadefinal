FROM node:16

WORKDIR /usr

COPY package*.* ./

RUN npm install

COPY . .

EXPOSE 5678

CMD ["node", "./src/server.js"]

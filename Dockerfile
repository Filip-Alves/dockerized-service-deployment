FROM node:22.19.0-alpine

WORKDIR /app
# si les package ne change pas, le reste n'est pas execut
COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]
FROM node

WORKDIR /app

COPY package.json pack.json
COPY package-lock.json package-lock.json

RUN npm i

COPY . .

EXPOSE 3035

CMD ["npm", "start"]
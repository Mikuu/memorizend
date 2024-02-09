FROM node:21-alpine
WORKDIR /app
COPY src .
COPY package.json .

RUN npm install

EXPOSE 3401
CMD ["npx", "nodemon", "app.js"]

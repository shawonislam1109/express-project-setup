FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn global add nodemon


COPY . .

EXPOSE 4000

CMD ["nodemon", "src/index.js"]


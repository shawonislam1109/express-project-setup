FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production=false

COPY . .

EXPOSE 5000

CMD ["node_modules/.bin/ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]


FROM node:18-alpine as builder
COPY package.json package-lock.json ./
COPY . .
RUN npm ci

WORKDIR /petpal
ENTRYPOINT ["npm", "run","dev"]
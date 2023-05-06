FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json .
COPY package-lock.json .
RUN npm install --production
CMD ["npm", "start"]
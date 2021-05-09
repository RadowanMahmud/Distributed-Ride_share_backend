FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm","start"]
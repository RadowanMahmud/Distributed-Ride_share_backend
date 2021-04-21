FROM node:14
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 9001
CMD ["npm","start"]
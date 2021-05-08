FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
# EXPOSE 8000 8001
CMD ["npm","start"]
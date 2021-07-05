FROM node:10.13.0
#FROM mongo:4.4.4
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 5090
CMD [ "npm","start" ]
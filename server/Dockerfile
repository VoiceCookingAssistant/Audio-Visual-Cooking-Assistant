FROM node:15.14.0-alpine3.10 as prod
WORKDIR /src/app
COPY . /src/app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start-prod"]

FROM prod as dev
CMD ["npm", "run", "start-docker-dev"]
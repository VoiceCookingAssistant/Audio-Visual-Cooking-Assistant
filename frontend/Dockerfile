# Dockerfile
FROM node:15.14.0-alpine3.10 as prod
WORKDIR /src/app
COPY . /src/app
RUN npm install
EXPOSE 5000 35729
CMD ["npm", "run", "prod-build-start"]

FROM prod as dev
CMD ["npm", "run", "dev"]
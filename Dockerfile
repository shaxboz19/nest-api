FROM node:lts-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
EXPOSE 3000
RUN npm run build
RUN npm prune --production
CMD ["npm", "run", "start:prod" ]
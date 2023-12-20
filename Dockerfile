
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4200
EXPOSE 49153

# CMD [ "npm", "start" ]
CMD /app/node_modules/.bin/ng serve --host 0.0.0.0 --poll 500
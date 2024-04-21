FROM node

# Create app directory
WORKDIR /app

COPY ./package.json .

RUN yarn install

RUN yarn add bcrypt --force

COPY . .

CMD ["yarn", "run" , "start"]

EXPOSE 3003
EXPOSE 3004
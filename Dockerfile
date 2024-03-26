FROM node

# Create app directory
WORKDIR /app

COPY ./package.json .

RUN yarn install

COPY . .

CMD ["yarn", "start"]

EXPOSE 3003
EXPOSE 5434
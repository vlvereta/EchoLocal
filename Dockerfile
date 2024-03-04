FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Expose frontend app port
EXPOSE 8000

CMD ["yarn", "start:frontend"]
# CMD [ "/bin/sh" ]

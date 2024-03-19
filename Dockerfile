FROM node:21-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 8080 3000

CMD ["yarn", "serve"]
# CMD [ "/bin/sh" ]

# docker build -t echolocal:latest .
# docker run --rm -p 80:8080 -p 3000:3000 echolocal
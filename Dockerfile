FROM node:21-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 8000 3000

CMD ["yarn", "start"]
# CMD [ "/bin/sh" ]

# docker build -t echolocal:latest .
# docker run --rm -p 8000:8000 echolocal
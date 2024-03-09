FROM node:21-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

# Expose frontend app port
EXPOSE 8000

CMD ["yarn", "start:frontend"]
# CMD [ "/bin/sh" ]

# docker build -t echolocal:latest .
# docker run --rm -p 8000:8000 echolocal
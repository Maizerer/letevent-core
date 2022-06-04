FROM node:lts as builder

WORKDIR /app

COPY . .

RUN npm install

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 5050

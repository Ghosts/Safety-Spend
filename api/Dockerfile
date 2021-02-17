FROM node:12-alpine as builder

WORKDIR /app
COPY package.json /app/package.json
RUN yarn
COPY . /app
RUN yarn build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json
RUN yarn --prod

EXPOSE 5000
CMD ["yarn", "start"]
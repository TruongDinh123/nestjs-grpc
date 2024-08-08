FROM node:alpine As development
 
WORKDIR /usr/src/app
 
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY proto proto
 
COPY apps/api-gateway apps/api-gateway
COPY libs libs
 
RUN yarn install
 
RUN yarn build api-gateway
 
CMD ["node", "dist/apps/src/api-gateway/main"]
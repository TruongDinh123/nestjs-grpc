FROM node:alpine As development
 
WORKDIR /usr/src/app
 
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY proto proto
 
COPY apps/auth apps/auth
COPY libs libs
 
RUN yarn install
 
RUN yarn build auth

CMD ["node", "dist/apps/src/auth/main"]
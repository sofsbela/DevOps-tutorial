FROM node:10
WORKDIR /nodejs_server
# Install app dependencies
COPY package*.json .
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3080

CMD npm run dev

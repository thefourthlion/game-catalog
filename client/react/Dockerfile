# what img to do you want to pull
FROM node:14-alpine

# where to work from, what everything will have access to
WORKDIR /game-catalog-client

# copy package.json to cache
COPY package.json .

# commands to run when booting img
RUN npm install

# copy file from root dir to root dir
COPY . .

# which port to use and which port to map it to
EXPOSE 4009 

# what commands to run when container is up
CMD ["npm", "start"]



# docker build -t game-catalog-client .
# docker run -dp 4009:4009 game-catalog-client
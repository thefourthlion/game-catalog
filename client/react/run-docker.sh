#!/bin/sh

# stop and delete container
docker stop ed-game-client
docker rm ed-game-client

# delete image
docker image rm game-client

# pull latest image and run as container
docker build -t game-client .

docker run -dp 4002:4002 --name ed-game-client game-client 
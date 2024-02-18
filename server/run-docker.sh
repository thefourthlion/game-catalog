#!/bin/sh

# stop and delete container
docker stop thebombroms-server
docker rm thebombroms-server

# delete image
docker image rm thebombroms-server

# pull latest image and run as container
docker build -t thebombroms-server .

docker run -dp 3025:3025 --name thebombroms-server thebombroms-server 
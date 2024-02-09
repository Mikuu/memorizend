Memorizend
--

Backend for Memorizering...

## Run project

## Run with local code
```commandline
npm run dev
```

## Run with docker
Ensure the mongodb container is running and connected with docker bridge network `mmr-network`, if not run below commands
```commandline
# create bridge network
docker network create mmr-network

# connect running database container to bridge network
docker network connect mmr-network mmrb-mongodb
```

Run service with docker
```commandline
./bulid-image.sh

./run-docker.sh
```

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

Build docker image
```commandline
./dockering.sh build 0.0.1
```

Tag docker image
```commandline
./dockering.sh tag 0.0.1
```

Push docker image
```commandline
./dockering push 0.0.1
```

Run service with docker
> for production only
```commandline
./run-docker.sh
```



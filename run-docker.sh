docker run -d -p 3401:3401 -e MMRB_ENV=docker -e MMRB_DB_USERNAME=mmr-user -e MMRB_DB_PASSWORD=mmr-password --network mmr-network --name memorizend memorizend:0.0.1

db.createUser({
    user: "mmr-user",
    pwd: "mmr-password",
    roles: [
        {
            role: "dbOwner",
            db: "mmrbackendb",
        },
    ],
});

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  db.createUser({
    user: "user",
    pwd: "password",
    roles: [
      { role: 'readWrite', db: "$MONGO_INITDB_DATABASE" }
    ]
  })
EOF

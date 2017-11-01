DROP TABLE if exists users;
DROP TABLE if exists mailingList;

CREATE TABLE users (
       userid SERIAL UNIQUE PRIMARY KEY,
       email VARCHAR(255),
       password_digest TEXT
);

CREATE TABLE mailingList (
      name text NOT NULL,
      email VARCHAR(255) NOT NULL
);

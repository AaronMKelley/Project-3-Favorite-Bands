DROP DATABASE company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR (255) NOT NULL,
    password_hash VARCHAR (255) NOT NULL,
    profile_photo  VARCHAR (200) DEFAULT NULL,
    spotify_playlist_link VARCHAR (255) NOT NULL
);

CREATE TABLE favorite_artists (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fav_artist VARCHAR (255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id )REFERENCES users(id)
);


CREATE TABLE saved_events(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    save_event VARCHAR (255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
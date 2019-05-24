CREATE DATABASE company_db;

USE company_db;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR (255) NOT NULL,
    password_hash VARCHAR (255) NOT NULL,
    admin VARCHAR(255),
    profile_photo VARCHAR  DISTINCT (200) DEFAULT NULL,
    spotify_playlist_link VARCHAR DISTINCT (255) NOT NULL
);


-- CREATE TABLE users_profile(
--     users_id INT NOT NULL,
--     FOREIGN KEY users_id REFERENCES users(id),
    
-- );

CREATE TABLE favorite_artists(
    fav_artist VARCHAR (255) NOT NULL,
    users_id INT NOT NULL,
    FOREIGN KEY users_id REFERENCES users(id)
);


CREATE TABLE saved_events(
    save_event VARCHAR (255) NOT NULL 
    users_id INT NOT NULL,
    FOREIGN KEY users_id REFERENCES users(id)
)
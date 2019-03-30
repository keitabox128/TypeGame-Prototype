CREATE TABLE typegame.users (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user VARCHAR(100) CHAR SET 'utf8' ,
  score INT,
  accuracy INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp not null default current_timestamp on update current_timestamp
);
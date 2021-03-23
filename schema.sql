DROP DATABASE IF EXISTS friday;
CREATE DATABASE friday;
USE friday;

CREATE TABLE repos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  repoId TEXT,
  repoName TEXT,
  owner TEXT,
  htmlUrl TEXT,
  description TEXT,
  updated TEXT,
  note TEXT
)

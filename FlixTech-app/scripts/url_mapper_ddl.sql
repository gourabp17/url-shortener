
CREATE TABLE url_mapper(
   actual_url VARCHAR (5000) PRIMARY KEY,
   shortened_url VARCHAR (50) UNIQUE NOT NULL,
   created_on TIMESTAMP NOT NULL,
   is_deleted Boolean 
);

CREATE TABLE url_vistitor(
   shortened_url VARCHAR (50) PRIMARY KEY,
   visited_by_ip VARCHAR (50) NOT NULL,
   visited_by_user_agent VARCHAR (50) NOT NULL,
   visitied_on TIMESTAMP NOT NULL,
   is_deleted Boolean,
  CONSTRAINT actual_url_fkey FOREIGN KEY (shortened_url)
      REFERENCES url_mapper (shortened_url) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
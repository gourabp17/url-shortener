
CREATE TABLE account_user(
   email_id VARCHAR (50) PRIMARY KEY,
   password VARCHAR (50) NOT NULL,
   created_on TIMESTAMP NOT NULL,
   last_login TIMESTAMP,
   is_deleted Boolean 
);
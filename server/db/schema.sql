
CREATE TABLE IF NOT EXISTS scores (
    id integer generated always as identity PRIMARY KEY,
    title varchar(40) NOT NULL,
	value integer NOT NULL
);
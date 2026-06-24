DROP TABLE IF EXISTS summaries;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
-- NOT NULL MEANS CANT BE EMPTY
-- TIMESTAMP — stores date and time
-- SERIAL — auto-incrementing number (1, 2, 3...). You never set this manually, postgres handles it
-- PRIMARY KEY — uniquely identifies each row. No two users can have the same id

CREATE TABLE summaries (
    id SERIAL PRIMARY key,
    user_id INTEGER REFERENCES users(id),
    source_url TEXT NOT NULL,
    summary_txt TEXT NOT NULL,
    key_points JSONB,
    timestamps JSONB,
    created_at TIMESTAMP DEFAULT NOW() 
);

-- JSONB stores JSON data directly in the database

-- user_id INTEGER REFERENCES users(id)
-- REFERENCES users(id) is a foreign key — it means this value must exist in the users table
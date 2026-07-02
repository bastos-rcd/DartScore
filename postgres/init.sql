CREATE TABLE "user"
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(5) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
    active BOOLEAN DEFAULT TRUE
);

-- password : hashedpwd
INSERT INTO "user" (name, email, password, role)
VALUES ('ADMIN', 'admin@dartscore.fr', '$2b$10$GwKnopMR9OUARx1AzEhfFuwWw629JxMhpG2nyMUqYIW9zpERHO1Tq', 'ADMIN');

CREATE TABLE "player"
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE "game"
(
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) DEFAULT '301' CHECK (type IN ('301','501','killer')),
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    rank JSONB NOT NULL DEFAULT '[]',
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE
);
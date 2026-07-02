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

INSERT INTO "player" (name, user_id)
VALUES ('Bastien', 1);
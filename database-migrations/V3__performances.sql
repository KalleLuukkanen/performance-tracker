CREATE TABLE "performances" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    workdate DATE NOT NULL,
    hours_spent NUMERIC(6,3) NOT NULL,
    performance_hours NUMERIC(6,3) NOT NULL,
    section_id INTEGER NOT NULL REFERENCES sections(id),
    user_id VARCHAR(255) NOT NULL REFERENCES app_user(id) ON DELETE CASCADE
);
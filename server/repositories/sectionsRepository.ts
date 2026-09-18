import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM sections
        WHERE user_id = ${user_id};`;
    return result;
};

const create = async (user_id: string, name: string, goal: number) => {
    const result = await sql`
        INSERT INTO sections (name, user_id, goal)
        VALUES (${name}, ${user_id}, ${goal})
        RETURNING *;`;
    return result[0];
};

const remove = async (id: number, user_id: string) => {
    const result = await sql`
        DELETE
        FROM sections
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;`;
    return result[0];
};

const removeAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM sections
        WHERE user_id = ${user_id}
        RETURNING *;`;
    return result;
};

const modify = async (id: number, user_id: string, name: string, goal: number) => {
    const result = await sql`
        UPDATE sections
        SET name = ${name}, goal = ${goal}
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;`;
    return result[0];
};

export { getAll, create, remove, removeAll, modify };
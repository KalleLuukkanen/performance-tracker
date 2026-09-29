import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM performances
        WHERE user_id = ${user_id}
        ORDER BY workdate DESC;`;
    return result;
};

const create = async (user_id: string, workdate: string, hours_spent: number, performance_hours: number, section_id: number) => {
    const result = await sql`
        INSERT INTO performances (user_id, workdate, hours_spent, performance_hours, section_id)
        VALUES (${user_id}, ${workdate}, ${hours_spent}, ${performance_hours}, ${section_id})
        RETURNING *;`;
    return result[0]
};

const remove = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM performances
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;`;
    return result[0];
};

const removeAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM performances
        WHERE user_id = ${user_id}
        RETURNING *;`;
    return result;
};

const updateHours = async (user_id: string, id: number, performance_hours: number) => {
    const result = await sql`
        UPDATE performances
        SET performance_hours = ${performance_hours}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;`;
    return result[0];
};

const modify = async (user_id: string, id: number,
    workdate: string, hours_spent: number, performance_hours: number, section_id: number) => {
    const result = await sql`
        UPDATE performances
        SET workdate = ${workdate}, hours_spent = ${hours_spent}, performance_hours = ${performance_hours}, section_id = ${section_id}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;`;
    return result[0];
};

export { getAll, create, remove, removeAll, updateHours, modify };
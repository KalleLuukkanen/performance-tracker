const BASE_URL = `${import.meta.env.VITE_API_URL}/api/performances`;

export type PerformanceData = {
    id: number;
    workdate: string;
    performance_hours: number;
    hours_spent: number;
    section_id: number;
};
export type PerformanceInput = Omit<PerformanceData, "id">;

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    return await response.json();
};

const create = async (performance: PerformanceInput) => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(performance),
    });
    return await response.json();
};

const remove = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    return await response.json();
};

const removeAll = async () => {
    const response = await fetch(`${BASE_URL}`, {
        credentials: "include",
        method: "DELETE",
    });
    return await response.json();
};

const updateHours = async (id: number, new_hours: number) => {
    const response = await fetch(`${BASE_URL}/${id}/hours`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_hours }),
    });
    return await response.json();
};

const modify = async (id: number, performance: PerformanceData) => {
    const response = await fetch(`${BASE_URL}/${id}/modify`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(performance),
    });
    return await response.json();
};

export { getAll, create, remove, removeAll, updateHours, modify };
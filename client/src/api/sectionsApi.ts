const BASE_URL = `${import.meta.env.VITE_API_URL}/api/sections`;

export type SectionData = {
    id: number;
    name: string;
    goal: number;
};

export type SectionInput = Omit<SectionData, "id">

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    return await response.json();
};

const create = async (section: SectionInput) => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
    });
    return await response.json();
};

const remove = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
};

const removeAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
        method: "DELETE",
    });
    return await response.json();
};

const modify = async (id: number, section: SectionData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
    });
    return await response.json();
};

export { getAll, create, remove, removeAll, modify };
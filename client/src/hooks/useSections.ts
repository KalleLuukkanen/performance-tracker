import * as sectionsApi from "../api/sectionsApi";
import { useState, useEffect } from "react";
import type { SectionData, SectionInput } from "../api/sectionsApi";

export function useSections() {
    const [sections, setSections] = useState<SectionData[]>([]);

    useEffect(() => {
        sectionsApi.getAll().then(setSections)
    }, []);

    const create = async (section: SectionInput) => {
        const created = await sectionsApi.create(section);
        if (created) {
            setSections((prev) => [...prev, created]);
            return created;
        } else {
            alert("There was a problem creating the section, please try again");
        }
    };

    const remove = async (id: number) => {
        const removed = await sectionsApi.remove(id);
        if (removed) {
            setSections((prev) => prev.filter((s) => s.id !== removed.id));
            return removed;
        } else {
            alert("The section couldn't be deleted, please try again");
        }
    };

    const removeAll = async () => {
        const removed = await sectionsApi.removeAll();
        setSections([]);
        return removed;
    };

    const modify = async (id: number, section: SectionData) => {
        const modified = await sectionsApi.modify(id, section);
        if (modified) {
            setSections((prev) => prev.map((s) => s.id === modified.id ? modified : s));
            return modified;
        } else {
            alert("There was a problem with the modification, please try again");
        }
    };

    return { sections, create, remove, removeAll, modify };
}
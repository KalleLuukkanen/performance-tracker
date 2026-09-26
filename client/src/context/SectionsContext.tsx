import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import * as sectionsApi from "../api/sectionsApi";
import type { SectionData, SectionInput } from "../api/sectionsApi";

type SectionsContextValue = {
    sections: SectionData[];
    create: (section: SectionInput) => Promise<SectionData>;
    remove: (section_id: number) => Promise<SectionData>;
    removeAll: () => Promise<SectionData[]>;
    modify: (section_id: number, new_section: SectionData) => Promise<SectionData>;
};

const SectionsContext = createContext<SectionsContextValue | null>(null);

export function SectionsProvider({ children }: { children: ReactNode }) {
    const [sections, setSections] = useState<SectionData[]>([]);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        sectionsApi.getAll().then(setSections);
    }, []);

    const create = async (section: SectionInput) => {
        const created = await sectionsApi.create(section);
        if (created) {
            setSections((prev) => [...prev, created]);
            return created;
        } else {
            alert("Section creation unsuccessful, please try again");
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

    return (
        <SectionsContext.Provider value={{ sections, create, remove, removeAll, modify }}>
            {children}
        </SectionsContext.Provider>
    )
}

export function useSections() {
    const ctx = useContext(SectionsContext);
    if (!ctx) throw new Error("useSections must be used within SectionsProvider");
    return ctx;
}
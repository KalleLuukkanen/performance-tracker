import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import * as performancesApi from "../api/performancesApi";
import type { PerformanceData, PerformanceInput } from "../api/performancesApi";

type PerformancesContextValue = {
    performances: PerformanceData[];
    getOne: (id: number) => PerformanceData | undefined;
    create: (performance: PerformanceInput) => Promise<PerformanceData>;
    remove: (id: number) => Promise<PerformanceData>;
    removeAll: () => Promise<PerformanceData[]>;
    updateHours: (id: number, new_hours: number) => Promise<PerformanceData>;
    modify: (id: number, performance: PerformanceData) => Promise<PerformanceData>;
    removeBySection: (section_id: number) => void;
};

const PerformancesContext = createContext<PerformancesContextValue | null>(null);

export function PerformancesProvider({ children }: { children: ReactNode }) {
    const [performances, setPerformances] = useState<PerformanceData[]>([]);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return
        fetchedRef.current = true;
        performancesApi.getAll().then(setPerformances);
    }, []);

    const getOne = (id: number) => {
        return performances.find((p) => p.id === id);
    };

    const create = async (performance: PerformanceInput) => {
        const created = await performancesApi.create(performance);
        if (created) {
            setPerformances((prev) => [...prev, created]);
            return created;
        } else {
            alert("Performance couldn't be added, please try again");
        }
    };

    const remove = async (id: number) => {
        const removed = await performancesApi.remove(id);
        if (removed) {
            setPerformances((prev) => prev.filter((p) => p.id !== removed.id));
            return removed;
        } else {
            alert("Performance couldn't be deleted, please try again");
        }
    };

    const removeAll = async () => {
        const removed = await performancesApi.removeAll();
        if (removed) {
            setPerformances([]);
            return removed;
        } else {
            alert("Performances couldn't be deleted, please try again");
        }
    };

    const updateHours = async (id: number, new_hours: number) => {
        const modified = await performancesApi.updateHours(id, new_hours);
        if (modified) {
            setPerformances((prev) => prev.map((p) => p.id === modified.id ? modified : p));
            return modified;
        } else {
            alert("Performance couldn't be updated, please try again");
        }
    };

    const modify = async (id: number, performance: PerformanceData) => {
        const modified = await performancesApi.modify(id, performance);
        if (modified) {
            setPerformances((prev) => prev.map((p) => p.id === modified.id ? modified : p));
            return modified;
        } else {
            alert("Performance couldn't be updated, please try again");
        }
    };

    const removeBySection = (section_id: number) => {
        setPerformances((prev) => prev.filter((p) => p.section_id !== section_id));
    }

    return (
        <PerformancesContext.Provider value={{ performances, getOne, create, remove, removeAll, updateHours, modify, removeBySection }}>
            {children}
        </PerformancesContext.Provider>
    );
}

export function usePerformances() {
    const ctx = useContext(PerformancesContext);
    if (!ctx) throw new Error("usePerformances must be used within PerformancesProvider");
    return ctx;
}
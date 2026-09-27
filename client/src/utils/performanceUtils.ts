import type { PerformanceData } from "../api/performancesApi";

export const performancesOfSection = (performances: PerformanceData[], section_id: number) => {
    return performances.filter((p) => p.section_id === section_id);
};

export const phaseAsString = (date: Date) => {
    const d = new Date(date);

    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const day = d.getUTCDate();

    let first_day: Date;
    let last_day: Date;

    if (day <= 15) {
        first_day = new Date(Date.UTC(year, month, 1));
        last_day = new Date(Date.UTC(year, month, 15));
    } else {
        first_day = new Date(Date.UTC(year, month, 16));
        last_day = new Date(Date.UTC(year, month + 1, 0));
    }

    return `${first_day.toLocaleDateString("fi-FI")} - ${last_day.toLocaleDateString("fi-FI")}`
};

export const performancesOfPhase = (performances: PerformanceData[], date: Date) => {
    const d = new Date(date);

    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const day = d.getUTCDate();

    let first_day: Date;
    let last_day: Date;

    if (day <= 15) {
        first_day = new Date(Date.UTC(year, month, 1));
        last_day = new Date(Date.UTC(year, month, 15));
    } else {
        first_day = new Date(Date.UTC(year, month, 16));
        last_day = new Date(Date.UTC(year, month + 1, 0));
    }

    return performances.filter((p) => new Date(p.workdate) <= last_day && new Date(p.workdate) >= first_day);
};

export const performancesOfSectionAndPhase = (performances: PerformanceData[], section_id: number, date: Date) => {
    return performancesOfPhase(performancesOfSection(performances, section_id), date);
};

const k = 7.25 / 8;

export const getEfficiencyOfOne = (performance: PerformanceData) => {
    if (performance.hours_spent === 0) return 0;
    const eff = performance.performance_hours / (k * performance.hours_spent);
    return eff * 100;
};

const sum = (arr: number[]) => {
    return arr.reduce((a, b) => Number(a) + Number(b), 0);
};

export const getEfficiency = (performances: PerformanceData[]) => {
    const eff = sum(performances.map((p) => p.performance_hours)) / (k * sum(performances.map((p) => p.hours_spent)))
    return eff * 100;
};

export const excessTime = (performances: PerformanceData[], goal: number) => {
    const timeReqForGoal = 7.25 * (goal / 100);  //for full 8 hour workday
    let excess = 0;
    for (const p of performances) {
        excess += p.performance_hours - timeReqForGoal;
    }
    return excess;
};

export const perfHoursNeeded = (excessTime: number, goal: number) => {
    const timeReqForGoal = 7.25 * (goal / 100);  //for full 8 hour workday
    return timeReqForGoal - excessTime;
};

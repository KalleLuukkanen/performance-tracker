import { describe, it, expect } from "vitest";
import * as performanceUtils from "../utils/performanceUtils";
import type { PerformanceData } from "../api/performancesApi";

const makePerformance = (overrides: Partial<PerformanceData>): PerformanceData => ({
    id: 1,
    workdate: "2026-03-15",
    hours_spent: 8,
    performance_hours: 7.25,
    section_id: 1,
    ...overrides,
});

describe("performancesOfSection", () => {
    const performances = [
        makePerformance({ id: 1, section_id: 1 }),
        makePerformance({ id: 2, section_id: 1 }),
        makePerformance({ id: 3, section_id: 2 }),
        makePerformance({ id: 4, section_id: 3 })
    ];

    it("returns only performances matching section", () => {
        const result = performanceUtils.performancesOfSection(performances, 1);
        expect(result).toHaveLength(2);
    });

    it("returns empty array, if no performances match the section", () => {
        const result = performanceUtils.performancesOfSection(performances, 4);
        expect(result).toHaveLength(0);
    });

    it("returns empty array, when given empty array", () => {
        const result = performanceUtils.performancesOfSection([], 1);
        expect(result).toHaveLength(0);
    });
});

describe("phaseAsString", () => {
    const dates: Date[] = [
        new Date(Date.UTC(2026, 9, 1)),
        new Date(Date.UTC(2026, 9, 5)),
        new Date(Date.UTC(2026, 9, 15)),
        new Date(Date.UTC(2026, 9, 16)),
        new Date(Date.UTC(2026, 9, 20)),
        new Date(Date.UTC(2026, 9, 31))
    ];

    it("returns the correct phase on the border cases", () => {
        const result1 = performanceUtils.phaseAsString(dates[0]);
        const result2 = performanceUtils.phaseAsString(dates[2]);
        const result3 = performanceUtils.phaseAsString(dates[3]);
        const result4 = performanceUtils.phaseAsString(dates[5]);
        expect(result1).toEqual("1.10.2026 - 15.10.2026");
        expect(result2).toEqual("1.10.2026 - 15.10.2026");
        expect(result3).toEqual("16.10.2026 - 31.10.2026");
        expect(result4).toEqual("16.10.2026 - 31.10.2026");
    });

    it("returns the correct phase in the middle of the phases", () => {
        const result1 = performanceUtils.phaseAsString(dates[1]);
        const result2 = performanceUtils.phaseAsString(dates[4]);
        expect(result1).toEqual("1.10.2026 - 15.10.2026");
        expect(result2).toEqual("16.10.2026 - 31.10.2026");
    });
});

describe("getPhases", () => {
    const performances = [
        makePerformance({ id: 1, workdate: "2026-09-30" }),
        makePerformance({ id: 2, workdate: "2026-09-20" }),
        makePerformance({ id: 3, workdate: "2026-09-13" }),
        makePerformance({ id: 4, workdate: "2026-09-01" }),
        makePerformance({ id: 5, workdate: "2026-08-28" })
    ];

    it("returns the correct amount of phases", () => {
        const result = performanceUtils.getPhases(performances);
        expect(result).toHaveLength(3);
    });

    it("returns the correct phase", () => {
        const result = performanceUtils.getPhases([performances[1]]);
        expect(result[0][1][0].getUTCDate()).toEqual(16);
        expect(result[0][1][1].getUTCDate()).toEqual(30);
        expect(result[0][1][0].getUTCMonth()).toEqual(8);
        expect(result[0][1][1].getUTCMonth()).toEqual(8);
        expect(result[0][1][0].getUTCFullYear()).toEqual(2026);
        expect(result[0][1][1].getUTCFullYear()).toEqual(2026);
    });

    it("returns empty array on empty input", () => {
        const result = performanceUtils.getPhases([]);
        expect(result).toHaveLength(0);
    });
});

describe("performancesOfPhase", () => {
    const performances = [
        makePerformance({ id: 1, workdate: "2026-09-30" }),
        makePerformance({ id: 2, workdate: "2026-09-20" }),
        makePerformance({ id: 3, workdate: "2026-09-13" }),
        makePerformance({ id: 4, workdate: "2026-09-01" }),
        makePerformance({ id: 5, workdate: "2026-08-28" })
    ];

    const dates = [
        new Date(Date.UTC(2026, 8, 25)),
        new Date(Date.UTC(2026, 8, 10)),
        new Date(Date.UTC(2026, 7, 20)),
        new Date(Date.UTC(2026, 7, 10)),
    ];

    it("returns correct amount of performances", () => {
        const result1 = performanceUtils.performancesOfPhase(performances, dates[0]);
        const result2 = performanceUtils.performancesOfPhase(performances, dates[1]);
        const result3 = performanceUtils.performancesOfPhase(performances, dates[2]);
        const result4 = performanceUtils.performancesOfPhase(performances, dates[3]);

        expect(result1).toHaveLength(2);
        expect(result2).toHaveLength(2);
        expect(result3).toHaveLength(1);
        expect(result4).toHaveLength(0);
    });

    it("returns the correct performances", () => {
        const result = performanceUtils.performancesOfPhase(performances, dates[2]);
        expect(result[0].id).toEqual(5);
    });

});

describe("performancesOfPhaseAndSection", () => {
    const performances = [
        makePerformance({ id: 1, workdate: "2026-09-30", section_id: 1 }),
        makePerformance({ id: 2, workdate: "2026-09-20", section_id: 1 }),
        makePerformance({ id: 3, workdate: "2026-09-13", section_id: 1 }),
        makePerformance({ id: 4, workdate: "2026-09-01", section_id: 2 })
    ];

    const dates = [
        new Date(Date.UTC(2026, 8, 25)),
        new Date(Date.UTC(2026, 8, 10)),
        new Date(Date.UTC(2026, 7, 10))
    ];

    it("returns correct amount of performances", () => {
        const result1 = performanceUtils.performancesOfSectionAndPhase(performances, 1, dates[0]);
        const result2 = performanceUtils.performancesOfSectionAndPhase(performances, 2, dates[0]);
        const result3 = performanceUtils.performancesOfSectionAndPhase(performances, 1, dates[1]);
        const result4 = performanceUtils.performancesOfSectionAndPhase(performances, 2, dates[1]);
        const result5 = performanceUtils.performancesOfSectionAndPhase(performances, 1, dates[2]);

        expect(result1).toHaveLength(2);
        expect(result2).toHaveLength(0);
        expect(result3).toHaveLength(1);
        expect(result4).toHaveLength(1);
        expect(result5).toHaveLength(0);
    });

    it("returns correct performances", () => {
        const result = performanceUtils.performancesOfSectionAndPhase(performances, 1, dates[1]);
        expect(result[0].id).toEqual(3);
    });
});

describe("getEfficiencyOfOne", () => {
    const performances = [
        makePerformance({ id: 1, performance_hours: 7.25, hours_spent: 8 }),
        makePerformance({ id: 2, performance_hours: 11.875, hours_spent: 8 }),
        makePerformance({ id: 3, performance_hours: 0, hours_spent: 8 }),
    ];

    it("returns the correct efficiency", () => {
        const result1 = performanceUtils.getEfficiencyOfOne(performances[0]);
        const result2 = performanceUtils.getEfficiencyOfOne(performances[1]);
        const result3 = performanceUtils.getEfficiencyOfOne(performances[2]);
        expect(result1).toEqual(100);
        expect(result2).toEqual(150);
        expect(result3).toEqual(0);
    });
});

describe("getEfficiency", () => {
    const performances = [
        makePerformance({ id: 1, performance_hours: 7.25, hours_spent: 8 }),
        makePerformance({ id: 2, performance_hours: 11.875, hours_spent: 8 }),
        makePerformance({ id: 3, performance_hours: 10, hours_spent: 8 }),
        makePerformance({ id: 3, performance_hours: 11, hours_spent: 8 }),
    ];

    it("returns the correct efficiency", () => {
        const result = performanceUtils.getEfficiency(performances);
        expect(result).toEqual(138);
    });
});

describe("excessTime", () => {
    const performances = [
        makePerformance({ id: 1, performance_hours: 7.25, hours_spent: 8 }),
        makePerformance({ id: 2, performance_hours: 11.875, hours_spent: 8 }),
        makePerformance({ id: 3, performance_hours: 10, hours_spent: 8 }),
        makePerformance({ id: 3, performance_hours: 11, hours_spent: 8 }),
    ];

    it("returns the correct time", () => {
        const result1 = performanceUtils.excessTime([performances[1]], 150);
        const result2 = performanceUtils.excessTime([performances[2], performances[3]], 100);
        const result3 = performanceUtils.excessTime([performances[0]], 150);
        expect(result1).toEqual(0);
        expect(result2).toEqual(6.25);
        expect(result3).toEqual(-4.625);
    });
});

describe("perfHourNeeded", () => {
    const performances = [
        makePerformance({ id: 1, performance_hours: 7.25, hours_spent: 8 }),
        makePerformance({ id: 2, performance_hours: 11.875, hours_spent: 8 }),
        makePerformance({ id: 3, performance_hours: 10, hours_spent: 8 }),
        makePerformance({ id: 3, performance_hours: 11, hours_spent: 8 }),
    ];

    it("returns the correct time", () => {
        const excessTime1 = performanceUtils.excessTime([performances[1]], 150);
        const excessTime2 = performanceUtils.excessTime([performances[2], performances[3]], 100);
        const excessTime3 = performanceUtils.excessTime([performances[0]], 150);

        const result1 = performanceUtils.perfHoursNeeded(excessTime1, 150);
        const result2 = performanceUtils.perfHoursNeeded(excessTime2, 100);
        const result3 = performanceUtils.perfHoursNeeded(excessTime3, 150);

        expect(result1).toEqual(11.875);
        expect(result2).toEqual(1);
        expect(result3).toEqual(16.5);
    });
});
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

});

describe("getPhases", () => {

});

describe("performancesOfPhase", () => {

});

describe("performancesOfPhaseAndSection", () => {

});

describe("getEfficiencyOfOne", () => {

});

describe("getEfficiency", () => {

});

describe("excessTime", () => {

});

describe("perfHourNeeded", () => {

});
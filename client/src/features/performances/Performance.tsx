import type { PerformanceData } from "../../api/performancesApi";
import { useSections } from "../../context/SectionsContext";

function Performance({ performance }: { performance: PerformanceData }) {
    const { getOne } = useSections();

    return (
        <>
            <p className="text-lg">{performance.performance_hours}</p>
            <p className="text-lg">{getOne(performance.section_id)?.name ?? "Unknown section"}</p>
            <p className="text-lg">{new Date(performance.workdate).toLocaleDateString("fi-FI")}</p>
        </>
    )
}

export default Performance;
import { getPhases } from "../utils/performanceUtils";
import { usePerformances } from "../context/PerformancesContext";
import Phase from "../features/performances/Phase";

function Phases() {
    const { performances } = usePerformances();
    let phases = getPhases(performances);
    return (
        <ul className="flex flex-col space-y-4">
            {phases.map((p) => (
                <li key={p[0]}><Phase first_day={p[1][0]} last_day={p[1][1]} /></li>
            ))}
        </ul>
    )
}

export default Phases;
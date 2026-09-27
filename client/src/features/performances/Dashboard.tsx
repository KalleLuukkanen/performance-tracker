import { usePerformances } from "../../context/PerformancesContext";
import { useSections } from "../../context/SectionsContext";
import * as performanceUtils from "../../utils/performanceUtils";
import Performance from "./Performance";

function Dashboard() {
    const today = new Date();

    const { performances } = usePerformances();
    const { sections } = useSections();
    const performancesOfPhase = performanceUtils.performancesOfPhase(performances, today);

    if (performancesOfPhase.length > 0) {
        return (
            <div className="sm:grid sm:grid-cols-2 flex flex-col space-y-4">
                <div className="flex flex-col space-y-4">
                    <span className="text-2xl">{performanceUtils.phaseAsString(today)}</span>
                    <ul className="flex flex-wrap space-x-4 space-y-2">
                        {performancesOfPhase.map((p) => (
                            <li className="border border-gray-300 rounded p-2" key={p.id}>
                                <Performance performance={p} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col space-y-4">
                    <span className="text-2xl">Efficiency:</span>
                    <ul className="flex flex-col space-y-2">
                        {sections.map(s => (
                            <li key={s.id}>
                                {performanceUtils.performancesOfSection(performancesOfPhase, s.id).length > 0 ?
                                    <>
                                        <p className="text-xl">{s.name}: {performanceUtils.getEfficiency(performanceUtils.performancesOfSection(performancesOfPhase, s.id)).toFixed(2)}</p>
                                        <p>You have {performanceUtils.excessTime(performanceUtils.performancesOfSection(performancesOfPhase, s.id), s.goal).toFixed(3)} excess time</p>
                                        <p>So to get to your goal, next (full) workday, you need to get {performanceUtils.perfHoursNeeded(performanceUtils.excessTime(performanceUtils.performancesOfSection(performancesOfPhase, s.id), s.goal), s.goal)} hours</p>
                                    </>
                                    :
                                    <p className="text-xl">{s.name}: No data for this phase</p>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <p className="text-lg">You have no performances in the current phase. Add new performances, or view the previous phases in <a href="/phases" className="underline text-blue-600">here</a>.</p>
                <p className="text-lg">Also, if you don't have any sections added yet, you can add some by clicking on the user icon in the top right corner.</p>
            </>
        )
    }

}

export default Dashboard;
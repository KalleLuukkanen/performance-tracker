import { phaseAsString, performancesOfPhase } from "../../utils/performanceUtils";
import { useState } from "react";
import { usePerformances } from "../../context/PerformancesContext";
import Performance from "./Performance";

function Phase({ first_day, last_day }: { first_day: Date, last_day: Date }) {
    const [showing, setShowing] = useState(false);
    const { performances } = usePerformances();
    const performancesList = performancesOfPhase(performances, first_day);
    return (
        <div className="flex flex-col space-y-4 rounded-xl bg-white p-4 shadow-lg">
            <button onClick={() => setShowing(!showing)} className="text-2xl cursor-pointer w-fit hover:font-bold">{phaseAsString(first_day)}</button>
            <ul className="flex flex-wrap space-x-4 space-y-2">
                {showing && performancesList.map((p) => (
                    <li className="border border-gray-300 rounded p-2" key={p.id}>
                        <Performance performance={p} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Phase;
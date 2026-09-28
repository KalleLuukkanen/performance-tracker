import type { PerformanceData } from "../../api/performancesApi";
import { useSections } from "../../context/SectionsContext";
import { usePerformances } from "../../context/PerformancesContext";
import { useState } from "react";
import { Trash, X, Check } from "lucide-react";

function Performance({ performance }: { performance: PerformanceData }) {
    const { getOne } = useSections();
    const { remove, updateHours } = usePerformances();

    const [eff, setEff] = useState(performance.performance_hours);
    const [modifying, setModifying] = useState(false);

    const cancel = () => {
        setEff(performance.performance_hours);
        setModifying(false);
    };

    const saveChanges = async () => {
        await updateHours(performance.id, Number(eff));
        setModifying(false);
    };

    const removePerf = async () => {
        if (!confirm("Are you sure you wish to delete this performance?")) return;
        await remove(performance.id);
        setModifying(false);
    };

    return (
        <div className="flex w-fit">
            <div>
                <div className="flex space-x-1">
                    <p className="text-lg">Efficiency:</p>
                    <input
                        className="text-lg w-20"
                        type="number"
                        value={eff}
                        onChange={(e) => {
                            setEff(Number(e.target.value));
                            setModifying(true);
                        }}
                    />
                </div>
                <p className="text-lg">Section: {getOne(performance.section_id)?.name ?? "Unknown section"}</p>
                <p className="text-lg">Date: {new Date(performance.workdate).toLocaleDateString("fi-FI")}</p>
            </div>
            {!modifying ?
                <button className="cursor-pointer hover:text-red-600" onClick={removePerf}><Trash /></button> :
                <div className="flex flex-col my-auto space-y-2">
                    <button className="cursor-pointer hover:text-red-600" onClick={cancel}><X /></button>
                    <button className="cursor-pointer hover:text-green-600" onClick={saveChanges}><Check /></button>
                </div>
            }
        </div>
    )
}

export default Performance;
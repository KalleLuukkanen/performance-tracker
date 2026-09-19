import { usePerformances } from "../../context/PerformancesContext"
import { useState } from "react"

function PerformanceForm() {
    const [efficiency, setEfficiency] = useState("");
    const [hoursSpent, setHoursSpent] = useState("8.00");
    const [section, setSection] = useState("");
    const [workdate, setWorkdate] = useState(new Date().toISOString());


    return (
        <form>
            <label>
                <span>Efficiency (in hours):</span>
                <input
                    type="number"
                    value={efficiency}
                    required
                    onChange={(e) => setEfficiency(e.target.value)}
                    className="p-1 rounded border border-gray-300"
                />
            </label>
            <label>
                <span>How many hours did you spend?</span>
                <input
                    type="number"
                    value={hoursSpent}
                    required
                    onChange={(e) => setHoursSpent(e.target.value)}
                    className="p-1 rounded border border-gray-300"
                />
            </label>
            <label>
                <span>Date:</span>
                <input
                    type="date"
                    value={workdate}
                    required
                    className="p-1 rounded border border-gray-300"
                    onChange={(e) => setWorkdate(e.target.value)}
                />
            </label>
            <label>
                <span>Section:</span>
                <select
                    value={section}
                    required
                    className="p-1 rounded border border-gray-300"
                    onChange={(e) => setSection(e.target.value)}
                >
                    <option></option>
                </select>
            </label>
        </form>
    )
}

export default PerformanceForm;
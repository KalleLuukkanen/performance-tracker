import { usePerformances } from "../../context/PerformancesContext"
import { useState } from "react"

function PerformanceForm() {
    const [efficiency, setEfficiency] = useState("");
    const [hoursSpent, setHoursSpent] = useState("8.00");
    const [section, setSection] = useState("");
    const [workdate, setWorkdate] = useState(new Date().toISOString().split("T")[0]);


    return (
        <form className="flex flex-col space-y-4">
            <span className="text-2xl">New performance:</span>
            <label className="flex flex-col space-y-2">
                <span className="text-lg">Efficiency (in hours):</span>
                <input
                    type="number"
                    value={efficiency}
                    required
                    onChange={(e) => setEfficiency(e.target.value)}
                    className="p-1 rounded border border-gray-300 w-fit"
                />
            </label>
            <label className="flex flex-col space-y-2">
                <span className="text-lg">How many hours did you spend?</span>
                <input
                    type="number"
                    value={hoursSpent}
                    required
                    onChange={(e) => setHoursSpent(e.target.value)}
                    className="p-1 rounded border border-gray-300 w-fit"
                />
            </label>
            <label className="flex flex-col space-y-2">
                <span className="text-lg">Date:{" "}
                    <span className="cursor-help text-sm" title="If working night shift, make sure to put the date on which the workday ends.">ⓘ</span>
                </span>
                <input
                    type="date"
                    value={workdate}
                    required
                    className="p-1 rounded border border-gray-300 w-fit"
                    onChange={(e) => setWorkdate(e.target.value)}
                />
            </label>
            <label className="flex flex-col space-y-2">
                <span className="text-lg">Section:{" "}
                    <span className="cursor-help text-sm" title="Add new sections on the user page, on the top right corner.">ⓘ</span>
                </span>
                <select
                    value={section}
                    required
                    className="p-1 rounded border border-gray-300 w-fit"
                    onChange={(e) => setSection(e.target.value)}
                >
                    <option></option>
                </select>
            </label>
            <button type="submit" className="bg-blue-300 rounded-2xl shadow-xl cursor-pointer text-lg">Save</button>
        </form>
    )
}

export default PerformanceForm;
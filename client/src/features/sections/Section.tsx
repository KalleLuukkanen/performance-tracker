import { useState } from "react";
import type { SectionData } from "../../api/sectionsApi";
import { useSections } from "../../context/SectionsContext";
import { usePerformances } from "../../context/PerformancesContext";
import { Trash, X, Check } from "lucide-react";

function Section({ section }: { section: SectionData }) {

    const { remove, modify } = useSections();
    const { removeBySection } = usePerformances();

    const [modifying, setModifying] = useState(false);
    const [name, setName] = useState(section.name)
    const [goal, setGoal] = useState(section.goal);

    const cancel = () => {
        setModifying(false);
        setName(section.name);
        setGoal(section.goal);
    };

    const modifySec = async () => {
        if (!confirm("Are you sure you wish to save these changes?")) return;
        await modify(section.id, { id: section.id, name, goal });
        setModifying(false);
    };

    const removeSec = async () => {
        if (!confirm("Are you sure you wish to delete this section? All the performances of the section will also be deleted.")) return;
        await remove(section.id);
        removeBySection(section.id);
    };

    return (
        <div className="flex">
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setModifying(true);
                    }}
                />
                <div className="flex space-x-1">
                    <p>Goal:</p>
                    <input
                        type="number"
                        value={goal}
                        onChange={(e) => {
                            setGoal(Number(e.target.value));
                            setModifying(true);
                        }}
                    />
                </div>
            </div>
            {!modifying ?
                <button className="ml-auto cursor-pointer" onClick={removeSec}><Trash /></button> :
                <div className="ml-auto flex flex-col">
                    <button className="cursor-pointer" onClick={cancel}><X /></button>
                    <button className="cursor-pointer" onClick={modifySec}><Check /></button>
                </div>
            }

        </div>
    )
}

export default Section;
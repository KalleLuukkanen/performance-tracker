import { useSections } from "../../context/SectionsContext";
import Section from "./Section";

function Sections() {
    const { sections } = useSections();

    return (
        <div className="flex flex-col space-y-2 shadow rounded p-2">
            <p className="text-xl">Sections:</p>
            <ul className="divide-y space-y-2">
                {sections.map((s) => (
                    <li key={s.id}><Section section={s} /></li>
                ))}
            </ul>

        </div>
    )
}

export default Sections;
import type { SectionData } from "../../api/sectionsApi";
import { useSections } from "../../hooks/useSections";
import { Trash } from "lucide-react";

function Section({ section }: { section: SectionData }) {


    return (
        <div className="flex">
            <div>
                <p>{section.name}</p>
                <p>Goal: {section.goal}</p>
            </div>
            <button className="ml-auto"><Trash /></button>
        </div>
    )
}

export default Section;
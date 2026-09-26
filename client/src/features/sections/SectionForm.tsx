import { useSections } from "../../context/SectionsContext";
import React, { useState } from "react";

function SectionForm() {
    const { create } = useSections();

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

    const reset = () => {
        setName("");
        setGoal("");
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await create({
            name: name,
            goal: Number(goal)
        });

        reset();

    }

    return (
        <form onSubmit={handleForm} className="flex flex-col p-2 space-y-2 shadow rounded">
            <p className="text-xl">Add section:</p>
            <label className="flex flex-col space-y-1">
                <span>Section name</span>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    className="border border-gray-300 p-1 rounded"
                    placeholder="Hevi or teollinen for example"
                />
            </label>
            <label className="flex flex-col space-y-1">
                <span>Section goal</span>
                <input
                    type="number"
                    onChange={(e) => setGoal(e.target.value)}
                    value={goal}
                    min="0"
                    max="200"
                    required
                    className="border border-gray-300 p-1 rounded"
                    placeholder="Efficiency goal 0-200"
                />
            </label>
            <button type="submit" className="rounded bg-blue-200 p-1 cursor-pointer w-32 mx-auto">Add</button>
        </form>
    )
}

export default SectionForm;
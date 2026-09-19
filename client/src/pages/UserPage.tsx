import { useUserState } from "../context/AuthContext";
import SectionForm from "../features/sections/SectionForm";
import { X } from "lucide-react";
import Sections from "../features/sections/Sections";

function UserPage({ onClose }: { onClose: () => void }) {
    const { userState, deleteAccount } = useUserState();

    return (
        <div
            className="w-full max-w-fit max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 shadow-xl flex flex-col space-y-1"
            onClick={(e) => e.stopPropagation()}
        >
            <button className="ml-auto cursor-pointer" onClick={onClose}><X /></button>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-2">
                    <SectionForm />
                    <Sections />
                </div>
                <div className="flex flex-col p-2 space-y-4 shadow rounded">
                    <p className="text-xl">User info:</p>
                    <p>Email: {userState.email}</p>
                    <p>Created: {userState.createdAt?.toLocaleDateString("fi-FI")}</p>
                    <button className="border rounded w-fit p-1 mx-auto cursor-pointer">Delete account</button>
                </div>
            </div>
        </div>
    )
}

export default UserPage;
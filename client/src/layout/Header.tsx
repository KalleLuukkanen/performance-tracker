import { LogOut, User } from "lucide-react";
import { useUserState } from "../context/AuthContext";
import { useState } from "react";

function Header() {
    const { logout } = useUserState();
    const [showingUserPage, setShowingUserPage] = useState(false);

    return (
        <div className="grid grid-cols-3 p-4">
            <div></div>
            <nav className="flex rounded-xl bg-white shadow-2xl p-1 space-x-4 shadow-2xl mx-auto">
                <a href="/" className="hover:font-bold">Home</a>
                <a href="/phases" className="hover:font-bold">Phases</a>
                <a href="/about" className="hover:font-bold">About</a>
            </nav>
            <div className="space-x-2 ml-auto">
                <button className="cursor-pointer border rounded p-1" title="User page" onClick={() => setShowingUserPage(!showingUserPage)}><User /></button>
                <button className="cursor-pointer border rounded p-1" title="Log out" onClick={logout}><LogOut /></button>
            </div>
        </div>
    )
}

export default Header;
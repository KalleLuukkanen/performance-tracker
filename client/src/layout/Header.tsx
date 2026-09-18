import { LogOut } from "lucide-react";
import { useUserState } from "../context/AuthContext";

function Header() {
    const { logout } = useUserState();

    return (
        <div className="flex p-4">
            <nav className="flex rounded-xl bg-white shadow-2xl p-1 space-x-4 mx-auto shadow-2xl">
                <a href="/" className="hover:font-bold">Home</a>
                <a href="/phases" className="hover:font-bold">Phases</a>
                <a href="/about" className="hover:font-bold">About</a>
            </nav>
            <button className="cursor-pointer border rounded p-1" title="Log out" onClick={logout}><LogOut /></button>
        </div>
    )
}

export default Header;
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useUserState } from "../context/AuthContext";
import { PerformancesProvider } from "../context/PerformancesContext";
import { SectionsProvider } from "../context/SectionsContext";

function Layout() {
    const { userState } = useUserState();

    if (!userState.email) {
        return (
            <div className="flex flex-col min-h-screen bg-green-200">
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <SectionsProvider>
            <PerformancesProvider>
                <div className="flex flex-col min-h-screen bg-green-200">
                    <Header />
                    <main className="flex-1 p-4">
                        <Outlet />
                    </main>
                </div>
            </PerformancesProvider>
        </SectionsProvider>
    );
}

export default Layout;
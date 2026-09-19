import Dashboard from "../features/performances/Dashboard";
import PerformanceForm from "../features/performances/PerformanceForm";

function Home() {
    return (
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[2fr_1fr]">
            <div className="flex flex-col rounded-xl shadow-2xl p-4 bg-white border">
                <Dashboard />
            </div>
            <div className="flex flex-col rounded-xl shadow-2xl p-4 bg-white items-center justify-center w-fit mx-auto border">
                <PerformanceForm />
            </div>
        </div>
    )
}

export default Home;
import { Outlet } from "react-router-dom";
import { useUserState } from "../../context/AuthContext";
import LoginOrRegister from "./LoginOrRegister";
import Loading from "../../layout/Loading";

function RequireAuth() {
    const { userState } = useUserState();

    if (userState.loading) {
        return <Loading />;
    }

    if (!userState.email) {
        return <LoginOrRegister isLogin={true} />;
    }

    return <Outlet />;
}

export default RequireAuth;
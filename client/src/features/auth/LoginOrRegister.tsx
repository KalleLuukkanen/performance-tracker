import { useState } from "react"
import { authClient } from "../../utils/auth.ts"

function LoginOrRegister({ isLogin }: { isLogin: boolean }) {
    const [success, setSuccess] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLogin) {
            await authClient.signIn.email(
                { email, password },
                {
                    onError: (c) => {
                        alert(c.error.message);
                    },
                    onSuccess: () => {
                        setSuccess(true);
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 1000);
                    },
                }
            );
        } else {
            await authClient.signUp.email(
                { email, password, name: email },
                {
                    onError: (c) => {
                        alert(c.error.message);
                    },
                    onSuccess: () => {
                        setSuccess(true);
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 1000);
                    }
                }
            );
        }
    };

    if (!success) {
        return (
            <div className="flex flex-col shadow-2xl mx-auto w-100 p-4 space-y-6 bg-white rounded">
                <span className="text-3xl">{isLogin ? "Login:" : "Register"}</span>
                <form
                    onSubmit={handleForm}
                    className="flex flex-col space-y-4"
                >
                    <label className="flex flex-col space-y-1">
                        <span className="text-lg">Email</span>
                        <input
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded p-1"
                        />
                    </label>
                    <label className="flex flex-col space-y-1">
                        <span className="text-lg">Password</span>
                        <input
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded p-1"
                        />
                    </label>
                    <button type="submit" className="border border-gray-300 rounded-2xl p-2 w-32 cursor-pointer bg-green-300 mx-auto">{isLogin ? "Login" : "Register"}</button>
                </form>
                <span className="border border-gray-500 mx-2" />
                {isLogin && <p>No account yet? Register <a href="/register" className="text-blue-600 hover:underline">here</a></p>}
                {!isLogin &&
                    <p>Already have an account? Login <a href="/login" className="text-blue-600 hover:underline">here</a></p>
                }
            </div>
        )
    } else {
        return (
            <div className="p-4 shadow-xl bg-white w-fit">
                <p className="text-2xl">{isLogin ? "Login" : "Registration"} successful! Redirecting...</p>
            </div>
        )
    }
}

export default LoginOrRegister;
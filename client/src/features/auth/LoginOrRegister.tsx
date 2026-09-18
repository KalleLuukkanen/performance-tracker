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
                        }, 2000);
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
                        }, 2000);
                    }
                }
            );
        }
    };

    if (!success) {
        return (
            <div>
                <span>{isLogin ? "Login:" : "Register"}</span>
                <form onSubmit={handleForm}>
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">{isLogin ? "Login" : "Register"}</button>
                </form>
                {isLogin && <p>No account yet? Register <a href="/register" className="text-blue-600 hover:underline">here</a></p>}
                {!isLogin &&
                    <div>
                        <p>Already have an account? Login <a href="/login" className="text-blue-600 hover:underline">here</a></p>
                        <p>Or you wish to read more about the page before signing up, you can do so
                            <a href="/about" className="text-blue-600 hover:underline">here</a>
                        </p>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div>
                <p>{isLogin ? "Login" : "Registration"} successful! Redirecting...</p>
            </div>
        )
    }
}

export default LoginOrRegister;
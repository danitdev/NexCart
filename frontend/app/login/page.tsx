
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.errMsg || "Login failed.");
                return;
            }

            localStorage.setItem("token", data.token);

            router.push("/");

        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <main>
            <header className="navbar">
                <div className="logo">
                    <Link href="/">NexCart</Link>
                </div>

                <nav>
                    <Link href="/products">Products</Link>
                    <Link href="/categories">Categories</Link>
                    <Link href="/orders">Orders</Link>
                </nav>

                <div className="nav-actions">
                    <Link href="/login">Login</Link>

                    <Link
                        href="/register"
                        className="register-button"
                    >
                        Register
                    </Link>

                    <Link
                        href="/cart"
                        className="cart-button"
                    >
                        Cart
                    </Link>
                </div>
            </header>

            <section className="auth-section">
                <div className="auth-card">
                    <div className="auth-header">
                        <p className="hero-label">
                            WELCOME BACK
                        </p>

                        <h1>Login</h1>

                        <p>
                            Sign in to your NexCart account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && (
                            <p className="form-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="auth-button"
                        >
                            Login
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link href="/register">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            <footer>
                <p>© 2026 NexCart. All rights reserved.</p>
            </footer>
        </main>
    );
}


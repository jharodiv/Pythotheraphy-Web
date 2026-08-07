import { Button, Card, Input } from "@components/ui";

import { useLogin } from "@hooks/authentication/useLogin";

export default function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        loading,
        handleLogin,
    } = useLogin();

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-green-700">
                        Phytotherapy
                    </h1>

                    <p className="text-sm text-gray-500">
                        Sign in to continue
                    </p>
                </div>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        error={emailError}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        error={passwordError}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full"
                    >
                        Sign In
                    </Button>
                </form>
            </Card>
        </main>
    );
}
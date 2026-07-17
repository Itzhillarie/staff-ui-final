const API = process.env.NEXT_PUBLIC_API_URL;

export async function login(username: string, password: string) {
    const res = await fetch(`${API}/api/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!res.ok) {
        throw new Error("Invalid credentials");
    }

    return res.json();
}
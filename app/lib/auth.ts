export async function getIdeas() {
    const token = localStorage.getItem("access");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ideas/`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.json();
}
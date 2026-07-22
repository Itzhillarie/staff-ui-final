import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API_URL!;

export async function getDashboard() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get("jwt")?.value;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  const [ideasRes, projectsRes, leaderboardRes] = await Promise.all([
    fetch(`${API}/ideas/list/`, {
      cache: "no-store",
      headers,
    }),

    fetch(`${API}/projects/`, {
      cache: "no-store",
      headers,
    }),

    fetch(`${API}/Gamification/leaderboard/`, {
      cache: "no-store",
      headers,
    }),
  ]);

  if (!ideasRes.ok) {
    throw new Error("Unable to load ideas");
  }

  if (!projectsRes.ok) {
    throw new Error("Unable to load projects");
  }

  if (!leaderboardRes.ok) {
    throw new Error("Unable to load leaderboard");
  }

  const ideas = await ideasRes.json();
  const projects = await projectsRes.json();
  const leaderboard = await leaderboardRes.json();

  const stats = {
    totalIdeas: ideas.length,

    draft: ideas.filter((i: any) => i.status === "Draft").length,

    submitted: ideas.filter((i: any) => i.status === "Submitted").length,

    peerReview: ideas.filter(
      (i: any) => i.status === "Peer Review"
    ).length,

    pmReview: ideas.filter(
      (i: any) => i.status === "Product Manager Review"
    ).length,

    approved: ideas.filter(
      (i: any) => i.status === "Approved"
    ).length,

    implementation: ideas.filter(
      (i: any) => i.status === "Implementation"
    ).length,

    projects: projects.length,
  };

  const pipeline = [
    {
      title: "Draft",
      count: stats.draft,
    },
    {
      title: "Submitted",
      count: stats.submitted,
    },
    {
      title: "Peer Review",
      count: stats.peerReview,
    },
    {
      title: "PM Review",
      count: stats.pmReview,
    },
    {
      title: "Approved",
      count: stats.approved,
    },
    {
      title: "Implementation",
      count: stats.implementation,
    },
  ];

  const recentIdeas = [...ideas]
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const recentActivity = recentIdeas.map((idea: any) => ({
    title: `${idea.title} (${idea.status})`,
    time: new Date(idea.created_at).toLocaleDateString(),
  }));

  return {
    stats,
    pipeline,
    recentIdeas,
    leaderboard,
    recentActivity,
    projects,
  };
}
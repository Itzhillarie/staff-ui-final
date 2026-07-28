"use client";

import Link from "next/link";

import {
  Eye,
  MessageCircle,
  ThumbsUp,
  Clock3,
  Loader2,
} from "lucide-react";


interface Idea {
  id: string;
  title: string;
  status: string;
  likes: number;
  comments: number;
  submitted: string;
}


interface Props {
  ideas: Array<{
    id: number;
    title: string;
    status: string;
    likes?: number;
    comments?: number;
    created_at: string;
  }>;

  loading?: boolean;
}


const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-cyan-700",
  Submitted: "bg-blue-100 text-cyan-700",
  "Peer Review": "bg-purple-100 text-cyan-700",
  "Product Manager Review": "bg-orange-100 text-cyan-700",
  Approved: "bg-green-100 text-cyan-700",
  Rejected: "bg-red-100 text-red-700",
  Implementation: "bg-cyan-100 text-cyan-700",
  "Impact Evaluation": "bg-pink-100 text-cyan-700",
  Archived: "bg-slate-100 text-cyan-700",
};


export default function RecentIdeas({
  ideas: dashboardIdeas,
  loading = false,
}: Props) {


  const ideas: Idea[] =
    dashboardIdeas.map((idea) => ({
      id: String(idea.id),
      title: idea.title,
      status: idea.status,
      likes: idea.likes ?? 0,
      comments: idea.comments ?? 0,
      submitted: new Date(
        idea.created_at
      ).toLocaleDateString("en-US"),
    }));


  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            My Recent Ideas
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest submitted ideas.
          </p>

        </div>


        <Link
          href="/dashboard/idea-board"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          View All
        </Link>

      </div>



      <div className="overflow-x-auto">

        {loading ? (

          <div className="flex justify-center py-12">

            <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />

          </div>


        ) : ideas.length === 0 ? (

          <div className="py-12 text-center text-slate-500">
            You haven't submitted any ideas yet.
          </div>


        ) : (

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Idea
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Likes
                </th>

                <th className="px-6 py-4 text-center">
                  Comments
                </th>

                <th className="px-6 py-4 text-center">
                  Submitted
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {ideas.map((idea) => (

                <tr
                  key={idea.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-5 font-medium">
                    {idea.title}
                  </td>


                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColors[idea.status] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {idea.status}
                    </span>

                  </td>


                  <td className="px-6 py-5 text-center">

                    <div className="flex items-center justify-center gap-2">

                      <ThumbsUp
                        size={16}
                        className="text-blue-600"
                      />

                      {idea.likes}

                    </div>

                  </td>


                  <td className="px-6 py-5 text-center">

                    <div className="flex items-center justify-center gap-2">

                      <MessageCircle
                        size={16}
                        className="text-cyan-600"
                      />

                      {idea.comments}

                    </div>

                  </td>


                  <td className="px-6 py-5 text-center">

                    <div className="flex items-center justify-center gap-2">

                      <Clock3
                        size={16}
                        className="text-cyan-500"
                      />

                      {idea.submitted}

                    </div>

                  </td>


                  <td className="px-6 py-5 text-center">

                    <Link
                      href={`/dashboard/idea-board/${idea.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 hover:bg-blue-600 hover:text-white"
                    >

                      <Eye size={16} />

                      View

                    </Link>

                  </td>


                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </section>
  );
}
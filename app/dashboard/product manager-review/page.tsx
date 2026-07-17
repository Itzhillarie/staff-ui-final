"use client";

import { useState } from "react";

import PMStats from "@/app/components/product-manager/PMStats";
import PMFilters from "@/app/components/product-manager/PMFilters";
import PMIdeaCard from "@/app/components/product-manager/PMIdeaCard";
import PMReviewDialog from "@/app/components/product-manager/PMReviewDialog";

const ideas = [
  {
    id: 1,
    title: "Smart Inventory Management",
    description:
      "Introduce QR code inventory management to reduce stock losses, improve inventory visibility, and automate stock tracking.",
    employee: "Hillary Chelimo",
    department: "ICT",
    category: "Technology",
    submitted: "12 Jul 2026",
    likes: 18,
    comments: 9,
    attachments: 2,
    status: "Peer Review",
    priority: "High" as const,
  },
  {
    id: 2,
    title: "Digital Leave Management",
    description:
      "Develop an online leave application workflow with automatic approvals and notifications.",
    employee: "Jane Doe",
    department: "Human Resource",
    category: "Process Improvement",
    submitted: "10 Jul 2026",
    likes: 13,
    comments: 5,
    attachments: 1,
    status: "PM Review",
    priority: "Medium" as const,
  },
  {
    id: 3,
    title: "Customer Support AI Chatbot",
    description:
      "Deploy an AI-powered chatbot to provide 24/7 customer support and reduce response time.",
    employee: "John Smith",
    department: "Customer Service",
    category: "Artificial Intelligence",
    submitted: "8 Jul 2026",
    likes: 25,
    comments: 14,
    attachments: 4,
    status: "Peer Review",
    priority: "High" as const,
  },
];

export default function ProductManagerReviewPage() {
  const [selectedIdea, setSelectedIdea] =
    useState<(typeof ideas)[0] | null>(null);

  const [open, setOpen] = useState(false);

  const handleReview = (idea: (typeof ideas)[0]) => {
    setSelectedIdea(idea);
    setOpen(true);
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Product Manager Review
        </h1>

        <p className="mt-2 text-slate-500">
          Review innovation ideas, assign priorities, approve or reject
          submissions, and initiate implementation projects.
        </p>
      </div>

      {/* Statistics */}

      <PMStats />

      {/* Filters */}

      <PMFilters />

      {/* Ideas */}

      <div className="space-y-6">
        {ideas.map((idea) => (
          <div key={idea.id} className="cursor-pointer">
            <PMIdeaCard idea={idea} onReview={() => handleReview(idea)} />
          </div>
        ))}
      </div>

      {/* Review Dialog */}

      <PMReviewDialog
        open={open}
        onClose={() => setOpen(false)}
        idea={selectedIdea}
      />

    </div>
  );
}
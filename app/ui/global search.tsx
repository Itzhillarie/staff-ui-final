// src/app/ui/global-search.tsx

"use client";
import { useState } from "react";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) return;

    const token = localStorage.getItem("token");

    // Uses $containsi filter from Strapi REST API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ideas?filters[title][$containsi]=${value}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setResults(data.data);
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="🔍 Search ideas..."
        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-10 left-0 w-full bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
          {results.map((idea: any) => (
            <div
              key={idea.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              <p className="font-semibold">{idea.title}</p>
              <p className="text-xs text-gray-500">{idea.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
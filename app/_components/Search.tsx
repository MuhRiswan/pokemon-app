"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export const Search = ({ search }: { search: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params
  const [searchTerm, setSearchTerm] = useState(search);

  const debouncedSearch = useDebounce(searchTerm, 700);

  useEffect(() => {
    if (!debouncedSearch) {
      router.push("/");
    } else {
      router.push(`?search=${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    // Reset search term when search parameter changes
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div className="relative w-full my-5">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokemon..."
        className="w-full max-w-xs px-4 py-2 pl-10 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary"
      />
      <div className="absolute inset-y-0 left-0 flex items-center justify-center w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

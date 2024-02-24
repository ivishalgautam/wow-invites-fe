"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { searchTemplates } from "@/hooks/useSearchTemplates";
import { useState } from "react";
import Link from "next/link";

export default function SearchInput() {
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef();
  const router = useRouter();

  const handleSearch = async () => {
    const searchQuery = inputRef.current.value.replace(/\s+/g, "-");
    if (!searchQuery.trim()) return setSearchResults([]);
    // Assuming this function fetches search results based on the query
    const results = await searchTemplates(searchQuery);
    setSearchResults(results);
    console.log({ results });
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -80,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="z-50 flex flex-col items-center justify-center"
    >
      <div className="space-y-8">
        <div className="text-white">
          <H1 className={"text-center"}>Cherish Every Moment</H1>
          <p className="mt-4 text-center">
            Personalized Invitations for Your Once-in-a-Lifetime Celebration
          </p>
        </div>
        <div className="relative flex gap-2 rounded-full bg-white p-2">
          <Input
            type="text"
            placeholder="Search template"
            className="flex-1 rounded-full border-none bg-gray-100 outline-none ring-0 focus-visible:ring-0"
            ref={inputRef}
            onChange={(e) => handleSearch()}
          />
          <Button
            onClick={() => {
              if (!inputRef.current.value) return;
              router.push(
                `/search?q=${inputRef.current.value.replace(/\s+/g, "-")}`,
              );
            }}
            className="h-10 w-10 rounded-full p-0"
          >
            <FaSearch size={15} />
          </Button>

          {/* search results */}
          <div className="absolute left-0 top-full w-full translate-y-1 rounded-xl bg-white">
            {searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {searchResults.map((result) => (
                  <li
                    key={result.id}
                    className="flex items-center justify-between p-3"
                  >
                    <span>{result.name}</span>
                    <Link
                      href={`/templates/${result.slug}`}
                      className={buttonVariants("primary")}
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Shared search text: the topbar search and the Explore Services search stay in sync
 * (same as the original page). From any other page, pressing Enter in the topbar
 * opens Explore Services with the query applied.
 */
type SearchContextValue = { query: string; setQuery: (q: string) => void };

const SearchContext = createContext<SearchContextValue>({ query: "", setQuery: () => {} });

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export const useSearch = () => useContext(SearchContext);

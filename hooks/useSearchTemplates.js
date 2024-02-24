import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "@/utils/http.js";

export const searchTemplates = async (q) => {
  return await http().get(`${endpoints.templates.getAll}/search?q=${q}`);
};

export function useSearchTemplates() {
  return useQuery(["templates", query], () => searchTemplates());
}

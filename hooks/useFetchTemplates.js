import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints.js";
import http from "../utils/http.js";

const fetchTemplates = async (is_featured) => {
  return await http().get(
    `${endpoints.templates.getAll}?featured=${is_featured}`,
  );
};

export function useFetchTemplates(is_featured) {
  return useQuery(["templates"], () => fetchTemplates(is_featured));
}

import { apiRequest } from "./client";
export function getAllPosts(page = 1, limit = 10) {
  return apiRequest(`/api/post?page=${page}&limit=${limit}`);
}

import { apiRequest } from "./client";

export function getAllPosts(page = 1, limit = 2) {
  return apiRequest(`/api/post?page=${page}&limit=${limit}`);
}

export function createPost(formData) {
  const token = localStorage.getItem("token");
  return fetch(`${import.meta.env.VITE_API_URL}/api/post/create-post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  });
}
export function getMyPosts() {
  return apiRequest("/api/post/my-posts");
}

export function deletePost(id) {
  return apiRequest(`/api/post/${id}`, { method: "DELETE" });
}

export function updatePost(id, formData) {
  const token = localStorage.getItem("token");
  return fetch(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  });
}

export function getPostById(id) {
  return apiRequest(`/api/post/${id}`);
}

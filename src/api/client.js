const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (response.status === 401 && token) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

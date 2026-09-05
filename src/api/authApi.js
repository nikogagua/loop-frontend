import { apiRequest } from "./client";

export function registerUser(name, email, password) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}
export function loginUser(email, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
export function verifyEmail(token) {
  return apiRequest(`/api/auth/verify-email/${token}`);
}
